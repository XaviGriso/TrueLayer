import env from 'dotenv';
import express from 'express';
import { Scopes, TokenResponse } from './apiClient/types';
import client from './apiClient';
import { ITransaction } from './apiClient/interfaces';
import { authenticate } from './fn/authenticate';
import { getAccounts } from './fn/getAccounts';
import { getTransactions } from './fn/getTransactions';

env.config();
const app = express();

app.get('/', (req, res) => {
	const scopes = [Scopes.accounts, Scopes.info, Scopes.transactions];
	const authURL = client.getAuthLink({ scopes });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const tokens: TokenResponse = await authenticate(req.query.code);
	const accounts = await getAccounts(tokens.access_token);
	const transactions = await getTransactions(tokens.access_token, accounts);

	res.set('Content-Type', 'text/plain');
	res.send(tokens);
});

app.listen(3000, () => console.log('App listening on port 3000...'));
