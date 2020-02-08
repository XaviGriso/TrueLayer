import axios from 'axios';
import env from 'dotenv';
import express from 'express';
import { Scopes, TokenResponse } from './apiClient/shared/types';
import { getAuthLink, exchangeCodeWithToken } from './apiClient';

env.config();
const app = express();

const scopes = [Scopes.info, Scopes.transactions];
app.get('/', (req, res) => {
	const authURL = getAuthLink({ scopes });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const code = req.query.code;
	const tokens = await exchangeCodeWithToken({
		httpClient: axios,
		code
	});

	res.set('Content-Type', 'text/plain');
	res.send(tokens);
});

app.listen(3000, () => console.log('App listening on port 3000...'));
