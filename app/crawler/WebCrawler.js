﻿import Crawler from 'crawler';
import { saveToFile, saveStatus, createNdJsonFile } from '../crawler/FileHandler';
import Url from 'url-parse';

const WebCrawler = (domain, regexes, numLevels, apiKey, response) => {
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

    // Start
    c.queue(domain); 

    createNdJsonFile(ndJSONFile);
    saveStatus(JSON.stringify({ "isDone" : false }), stateFile);
    response.status(200).send({ state: "In progress", fileId: filename });

    console.log(`crawling... ${domain}`);
};

export default WebCrawler;