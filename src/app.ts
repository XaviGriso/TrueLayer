import env from 'dotenv';
import express from 'express';
import { Scopes } from './apiClient/types';
import { getAuthLink } from './apiClient';

env.config();
const app = express();

app.get('/', (req, res) => {
	const authURL = getAuthLink({ scopes: [Scopes.transactions] });
	res.redirect(authURL);
});

app.listen(3000, () => console.log('Example app listening on port 3000...'));
