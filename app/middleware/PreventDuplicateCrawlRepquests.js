import { fileDownloadComplete } from '../crawler/FileHandler';
import Url from 'url-parse';

// Can't request the same domain to be crawled twice while the previous crawl request is not finished
const preventDuplicateCrawlRequests = (req, res, next) => {
    try {
        const filename = `${req.body.apiKey}-${new Url(req.body.domain, true).hostname}`;

        fileDownloadComplete(filename, data => {
            if (data && !JSON.parse(data).isDone) {
                res.send({ message: `Web crawler is already crawling ${req.body.domain}`, isDone: false, fileId: filename });
            } else {
                next();
            } 
        });
    } catch (e) {
        res.status(400).send({ status: "unsuccessful", errorMessage: e });
    }
};

export default preventDuplicateCrawlRequests;