const verifyParameters = (req, res, next) => {
    try {
        if (!req.body.domain || !req.body.regexes || !req.body.apiKey) throw "Please include the domain and a list of regular expressions to find in the pages and your api key.";

        if (!req.body.numLevels) req.body.numLevels = 3; // default to 3 levels

        next();
    } catch (e) {
        res.status(400).send({ status: "unsuccessful", errorMessage: e });
    }
};

export default verifyParameters;