import Crawler from 'crawler';
import { saveToFile, saveStatus, createNdJsonFile } from '../crawler/FileHandler';
import Url from 'url-parse';

/*
 * Call WebCrawler with the following parameters:
 * 
 * (domain) : the domain you want to start crawl with
 * (regexes) : a list of regular expressions you want to match on the page
 * (numLevels) : the depth of the crawl
 * (apiKey) : the client's personal api key
 * (response) : a callback to pass the response to
 */
const WebCrawler = (domain, regexes, numLevels, apiKey, callback) => {
    let foundLinks = [];
    let currentLevel = 1;
    let count = 0;

    // Files
    const filename = `${apiKey}-${new Url(domain, true).hostname}`;
    const ndJSONFile = `${filename}-.ndjson`;
    const stateFile = `${filename}-.status`; // For tracking crawl completion

    var c = new Crawler({
        retries: 1,
        retryTimeout: 3000,
        skipDuplicates: true,
        maxConnections: 10,
        callback:
            (error, res, done) => {
                // Begin Crawling This Page
                if (error) {
                    console.log('Error caugth while fetching page');
                } else {
                    let $ = res.$;
                    try {
                        regexes.map((regex) => {
                            $("a[href^='http']").each((index, a) => {
                                const pattern = new RegExp(regex, "i");

                                if (a.attribs.href && pattern.test(a.attribs.href)) {
                                    foundLinks.push(a.attribs.href);
                                    // Append Link to .ndJSON file
                                    saveToFile(
                                        JSON.stringify({ url: a.attribs.href, "regex": regex }),
                                        ndJSONFile
                                    );
                                    count++;
                                }
                            });
                        });
                    } catch (error) {
                        console.log('Error caugth while crawling page');
                    }
                }

                done();

                // if queue size is empty, populate queue with found urls and increase crawl level
                if (c.queueSize === 0) {

                    if (foundLinks.length === 0) {
                        console.log('exited crawl');
                        saveStatus(JSON.stringify({ "isDone": true }), stateFile);
                        return;
                    }

                    if (currentLevel < numLevels) {
                        c.queue(foundLinks);
                        currentLevel++;
                        console.log(`current Level: ${currentLevel}`);
                    } else {
                        console.log(`status: completed, links matched: ${count}`);
                        saveStatus( JSON.stringify({ "isDone": true }), stateFile );
                    }
                    foundLinks = [];// Empty the found urls so it will be re-populated again
                }
            }
    });

    // Start crawling the start page
    c.queue(domain);

    createNdJsonFile(ndJSONFile);
    saveStatus(JSON.stringify({ "isDone": false }), stateFile);
    callback({ status: "New crawl started", fileId: filename });
};

export default WebCrawler;
