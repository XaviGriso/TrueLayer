import { IHTTPClient, IAuthResponse } from '../interfaces/network';
import qs from 'qs';
import axios from 'axios';
import { ApiError } from './apiError';

export type ExchangeCodeTokenConfig = {
	code: string;
	httpClient?: IHTTPClient;
	redirect_uri?: string;
	auth_url?: string;
	client_id?: string;
	client_secret?: string;
};

export const exchangeCodeWithToken = ({
	code,
	httpClient = axios,
	redirect_uri = process.env.redirect_uri || '',
	auth_url = process.env.auth_url || '',
	client_id = process.env.client_id || '',
	client_secret = process.env.client_secret || ''
}: ExchangeCodeTokenConfig): Promise<IAuthResponse> =>
	httpClient
		.post(
			`${auth_url}/connect/token`,
			qs.stringify({
				grant_type: 'authorization_code',
				client_id,
				client_secret,
				redirect_uri,
				code
			}),
			{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
		)
		.then((response: IAuthResponse) => response)
		.catch((error: any) => Promise.reject(ApiError(error)));
