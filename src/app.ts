import env from 'dotenv';
import express from 'express';
import { Scopes } from './apiClient/types';
import client from './apiClient';
import { authenticate } from './fn/authenticate';
import { getAccounts } from './fn/getAccounts';
import { getTransactions } from './fn/getTransactions';
import { getInfo } from './fn/getInfo';
import { setUser } from './db/users';
import { setUserTransactions, getUserTransactions } from './db/transactions';

env.config();
const app = express();

app.get('/', (req, res) => {
	const scopes = [Scopes.accounts, Scopes.info, Scopes.transactions];
	const authURL = client.getAuthLink({ scopes });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const { access_token } = await authenticate(req.query.code);
	const [userInfo] = await getInfo(access_token);
	const accounts = await getAccounts(access_token);
	const transactions = await getTransactions(access_token, accounts);

	const userId = await setUser(userInfo, access_token);
	await setUserTransactions(userId, transactions);

	const response = `<div>
	    <a href='/transactions/${userId}'>Get the stored transactions</a>
	</div>`;

	res.set('Content-Type', 'text/html');
	res.send(response);
});

app.get('/transactions/:user_id', async (req, res) => {
	const userId: number = +(req.params.user_id || 0);
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(await getUserTransactions(userId)));
});

app.listen(3000, () => console.log('App listening on port 3000...'));
