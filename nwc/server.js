import App from './app';

//	default to port 3000
const PORT = process.env.PORT || '3000';

//	Start Server
App.listen(PORT);
console.log(`Listening on port ${PORT}...`);