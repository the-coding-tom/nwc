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
        ""
    }
```
