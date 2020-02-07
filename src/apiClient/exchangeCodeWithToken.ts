import { IHTTPClient } from './shared/interfaces';
import { AuthResponse, TokenResponse } from './shared/types';

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
		const { access_token, refresh_token }: AuthResponse = await httpClient.post(
			`${auth_url}/connect/token`,
			{
				grant_type: 'authorization_code',
				client_id,
				client_secret,
				redirect_uri,
				code
			},
			{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
		);

		return {
			access_token,
			refresh_token
		};
	} catch (error) {
		console.log('Error exchanging the code', error);
		throw error;
	}
};
