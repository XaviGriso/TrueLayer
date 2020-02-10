import env from 'dotenv';
import express from 'express';
import { Scopes } from './apiClient/types';
import client from './apiClient';
import { authenticate } from './fn/authenticate';
import { getAccounts } from './fn/getAccounts';
import { getTransactions } from './fn/getTransactions';
import { getInfo } from './fn/getInfo';
import { setUser } from './db/users';
import { setUserTransactions } from './db/transactions';

env.config();
const app = express();

app.get('/', (req, res) => {
	const scopes = [Scopes.accounts, Scopes.info, Scopes.transactions];
	const authURL = client.getAuthLink({ scopes });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const tokens = await authenticate(req.query.code);
	const [userInfo] = await getInfo(tokens.access_token);
	const accounts = await getAccounts(tokens.access_token);
	const transactions = await getTransactions(tokens.access_token, accounts);

	const userId = await setUser(userInfo);
	await setUserTransactions(userId, transactions);

	res.set('Content-Type', 'text/plain');
	res.send('Data fetched correctly');
});

app.listen(3000, () => console.log('App listening on port 3000...'));
