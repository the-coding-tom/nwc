import express from 'express';
import bodyParser from 'body-parser';
import routes from './app/routes/routes';

const App = express();

// Middleware Filters
App.use(bodyParser.urlencoded({
	extended: true
}));
App.use(bodyParser.json());

// catch HTTP Error 400
App.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(400).send(`Error: ${res.originUrl} not found`);
	next();
});

// catch HTTP Error 500
App.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send(`Error: ${err}`);
	next();
});

// Register routes
routes(App);

export default App;