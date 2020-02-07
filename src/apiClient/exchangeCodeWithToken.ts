import { IHTTPClient } from './shared/interfaces';
import { AuthResponse, TokenResponse, RequestOptions } from './shared/types';

export type ExchangeCodeTokenConfig = {
	httpClient: IHTTPClient;
	redirect_uri: string;
	code: string;
	auth_url: string;
	client_id: string;
	client_secret: string;
};

export const exchangeCodeWithToken = async ({
	httpClient,
	redirect_uri = process.env.redirect_uri || '',
	code,
	auth_url = process.env.auth_url || '',
	client_id = process.env.client_id || '',
	client_secret = process.env.client_secret || ''
}: ExchangeCodeTokenConfig): Promise<TokenResponse> => {
	const requestOptions: RequestOptions = {
		uri: `${auth_url}/connect/token`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: {
			grant_type: 'authorization_code',
			client_id,
			client_secret,
			redirect_uri,
			code
		}
	};

	try {
		const { access_token, refresh_token }: AuthResponse = await httpClient.post(
			requestOptions
		);

		return {
			access_token,
			refresh_token
		};
	} catch (error) {
		throw error;
	}
};
