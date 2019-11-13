import VerifyParams from '../middleware/VerifyParams';
import WebCrawler from '../crawler/WebCrawler';
import path from 'path';
import { fileDownloadComplete } from '../crawler/FileHandler';


export default (router) => {
    router.post('/api/crawl', VerifyParams, (req, res) => {
        // TODO: handle web crawling here and send response
        WebCrawler(req.body.domain, req.body.regexes, req.body.numLevels, req.body.apiKey, (response) => {
            res.status(200).send(response);
        });
    });

    router.get('/api/data/:fileId', (req, res) => {
        // TODO: implement route to return file if crawl is completed
        fileDownloadComplete(req.params.fileId, data => {
            if (JSON.parse(data).isDone) {
                res.download(path.join(__dirname, '../data/ndjson', `${req.params.fileId}-.ndjson`));
            }
        });
    });

    router.get('/api/status/:fileId', (req, res) => {
        // TODO: implement route to return status
        fileDownloadComplete(req.params.fileId, data => {
            if (JSON.parse(data).isDone) {
                res.status(200).send({ message: "Web crawl is complete.", isDone: true, fileId: req.params.fileId });
            } else {
                res.status(200).send({ message: "Web crawler is currently gathering your data", isDone: false, fileId: req.params.fileId });
            }
        });
    });
};
