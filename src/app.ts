import axios from 'axios';
import env from 'dotenv';
import express from 'express';
import { Scopes, TokenResponse } from './apiClient/shared/types';
import { getAuthLink, exchangeCodeWithToken } from './apiClient';

env.config();
const app = express();

app.get('/', (req, res) => {
	const authURL = getAuthLink({ scopes: [Scopes.transactions] });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const code = req.query.code as string;
	let tokens: TokenResponse | null = null;

	try {
		tokens = await exchangeCodeWithToken({
			httpClient: axios,
			code
		});
	} catch (error) {
		console.log('ERROR!');
	}

	res.set('Content-Type', 'text/plain');
	res.send('Tokens: ' + JSON.stringify(tokens));
});

app.listen(3000, () => console.log('App listening on port 3000...'));
