require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE_URI;

mongoose
	.connect(DB)
	.then(() => {
		console.log('DB connection established');
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

app.listen(3000, () => {
	console.log('Server running. Use our API on port: 3000');
});
