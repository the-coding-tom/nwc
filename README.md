# nwc
A simple web crawling Node.js app

## Getting Started
* Install app dependecies by running
```javascript
    npm install
```
* To run the app, run
```javascript
    npm start
```

## Making Requests
* How to make a request to crawl a webpage.
Send an Http Post request to http://localhost:3000/api/crawl
with the body parameters
```javascript
    {
        "domain" : "someurl.com",
        "regexes" : ["\a", "\b", "\c"],
        "numLevels" : 3,
        "apiKey" : "1234"
    }
```
The service will respond with:
```javascript
    {
        "state" : "In progress",
        "saveToFile" : "filename"
    }
```

* To Check The Status Of the download.
Send 
