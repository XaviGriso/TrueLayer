import { IHTTPClient } from './shared/interfaces';
import { AuthResponse, TokenResponse } from './shared/types';
import qs from 'qs';
import axios from 'axios';

export type ExchangeCodeTokenConfig = {
	httpClient: IHTTPClient;
	code: string;
	redirect_uri?: string;
	auth_url?: string;
	client_id?: string;
	client_secret?: string;
};

export const exchangeCodeWithToken = async ({
	httpClient,
	code,
	redirect_uri = process.env.redirect_uri || '',
	auth_url = process.env.auth_url || '',
	client_id = process.env.client_id || '',
	client_secret = process.env.client_secret || ''
}: ExchangeCodeTokenConfig): Promise<TokenResponse> => {
	try {
		const response = await axios({
			method: 'post',
			url: 'https://auth.truelayer-sandbox.com/connect/token',
			data: qs.stringify({
				grant_type: 'authorization_code',
				client_id: 'sandbox-piggybank-5a2d39',
				client_secret: '40332d35-da03-493e-9340-c0d983c432dd',
				redirect_uri: 'http://localhost:3000/callback',
				code: code
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		return {
			access_token: response.data.access_token,
			refresh_token: response.data.refresh_token
		};
	} catch (error) {
		console.log('Error exchanging the code', error);
		throw error;
	}
};
