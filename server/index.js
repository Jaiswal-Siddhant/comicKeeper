const malScraper = require('mal-scraper');
// import express, { Request, Response } from 'express';
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const search = malScraper.search;

app.post('/search', async (req, res) => {
	try {
		const { term } = req.body;
		console.log(req.body);
		const resp = await search.search('manga', {
			term,
			type: 0,
			status: 0,
			score: 0,
			producer: 0,
			rating: 0,
			genreType: 1,
		});

		res.json(resp).end();
	} catch (error) {
		console.log('Error: ' + error);
		res.status(500).end();
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
