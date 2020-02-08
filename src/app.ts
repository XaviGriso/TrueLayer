import env from 'dotenv';
import express from 'express';
import { Scopes, TokenResponse } from './apiClient/types';
import client from './apiClient';
import { ITransaction, IAccount } from './apiClient/interfaces';

env.config();
const app = express();
const scopes = [Scopes.accounts, Scopes.info, Scopes.transactions];

app.get('/', (req, res) => {
	const authURL = client.getAuthLink({ scopes });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const tokens: TokenResponse = await client.exchangeCodeWithToken({
		code: req.query.code
	});

	const accounts = await client.get<IAccount>({
		token: tokens.access_token,
		path: 'accounts'
	});

	let transactions: ITransaction[] = [];
	if (accounts) {
		accounts.forEach(async ({ account_id }) => {
			const accountTransactions = await client.get<ITransaction>({
				token: tokens.access_token,
				path: `accounts/${account_id}/transactions`
			});
			transactions = transactions.concat(accountTransactions);
			console.log('transactions:', transactions.length);
		});
	}

	res.set('Content-Type', 'text/plain');
	res.send(tokens);
});

app.listen(3000, () => console.log('App listening on port 3000...'));
