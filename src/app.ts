import axios from 'axios';
import env from 'dotenv';
import express from 'express';
import { Scopes, TokenResponse } from './apiClient/shared/types';
import { getAuthLink, exchangeCodeWithToken } from './apiClient';
import { getAccounts } from './apiClient/getAccounts';

env.config();
const app = express();

const scopes = [Scopes.accounts, Scopes.info, Scopes.transactions];
app.get('/', (req, res) => {
	const authURL = getAuthLink({ scopes });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const code = req.query.code;
	const tokens: TokenResponse = await exchangeCodeWithToken({
		httpClient: axios,
		code
	});

	const accounts = await getAccounts({
		httpClient: axios,
		token: tokens.access_token,
		path: 'accounts'
	});

	res.set('Content-Type', 'text/plain');
	res.send(accounts);
});

app.listen(3000, () => console.log('App listening on port 3000...'));
