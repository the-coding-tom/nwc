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
        "status" : "New crawl started",
        "fileId" : "filename"
    }
```

* To check if the crawl is complete,
send a GET request with filename as a parameter to http://localhost:3000/api/status
example: 
```javascript
http://localhost:3000/api/status/fileId
```
The service will respond with:
```javascript
    {
    	"message": "Web crawl is complete.",
    	"isDone": true,
    	"fileId": "hjgyjuyghgj32y-www.amazon.com"
    }
```
if the crawl is complete. Else:
```javascript
    {
    	"message": "Web crawler is currently gathering your data.",
    	"isDone": false,
    	"fileId": "hjgyjuyghgj32y-www.amazon.com"
    }
```

* To Download The saved data (.ndJson file), 
Send a GET Request with filename as a parameter to http://localhost:3000/api/data 
example: 
```javascript
http://localhost:3000/api/data/fileId
```
The service will respond with a .ndJson file 
```javascript
    {"url" : "matched url", "regex" : "the pattern that matched"}
    ...
    {"url" : "matched url", "regex" : "the pattern that matched"}
    {"url" : "matched url", "regex" : "the pattern that matched"}
```
*NB: .ndJson files are stored in the root folder /app/data/ndjson by the app*

## Test
This is a test to crawl amazon.com with 5 url regular expressions to search for including a social media url regex and a crawl depth of 3 levels and a dummy api key
```javascript
    {
	    "domain":"http://www.amazon.com",
	    "regexes":["^https?:\/\/(www.)?amazon.com.?", 
                    	"^https?:\/\/(www.)?facebook.com.?", 
                    	"^https?:\/\/(www.)?ring.com.?",
                    	"^https?:\/\/(www.)?audible.com.?", 
                    	"^https?:\/\/(www.)?alexa.com.?"],
	    "numLevels":3,
	    "apiKey":"hjgyjuyghgj32y"
    }
```
