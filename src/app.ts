import env from 'dotenv';
import express from 'express';
import { Scopes } from './apiClient/types';
import client from './apiClient';
import { authenticate } from './fn/authenticate';
import { getAccounts } from './fn/getAccounts';
import { getTransactions } from './fn/getTransactions';
import { getInfo } from './fn/getInfo';
import { setUser, getUserById } from './db/users';
import { setUserTransactions, getUserTransactions } from './db/transactions';

env.config();
const app = express();

app.get('/', (req, res) => {
	const scopes = [Scopes.accounts, Scopes.info, Scopes.transactions];
	const authURL = client.getAuthLink({ scopes });
	res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
	const access_token = await authenticate(req.query.code);

	let response;
	if (access_token) {
		const userInfo = await getInfo(access_token);
		const accounts = await getAccounts(access_token);
		const transactions = await getTransactions(access_token, accounts);

		if (userInfo && transactions) {
			const userId = await setUser(userInfo, access_token);
			await setUserTransactions(userId, transactions);

			response = `<div>
		        <a href='/transactions/${userId}'>Get the stored transactions</a>
		        <br />
		        <br />
		        <a href='/debug/${userId}'>Debug the user</a>
		    </div>`;
		} else {
			response = '<span>Error retrieving user data. Please try again</span>';
		}
	} else {
		response = '<span>Error authenticating the user. Please try again</span>';
	}

	res.set('Content-Type', 'text/html');
	res.send(response);
});

app.get('/transactions/:user_id', async (req, res) => {
	const userId: number = +(req.params.user_id || 0);
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(await getUserTransactions(userId)));
});

app.get('/debug/:user_id', async (req, res) => {
	const userId: number = +(req.params.user_id || 0);
	const [user] = await getUserById(userId);

	const { token: access_token } = user;
	const userInfo = await getInfo(access_token);
	const accounts = await getAccounts(access_token);
	const transactions = await getTransactions(access_token, accounts);

	const testResponse = {
		info: userInfo ? 'OK' : '---',
		accounts: accounts.length,
		transactions: transactions.length
	};

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(testResponse));
});

app.listen(3000, () => console.log('App listening on port 3000...'));
