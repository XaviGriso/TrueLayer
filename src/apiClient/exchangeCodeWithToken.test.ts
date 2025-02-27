import {
	exchangeCodeWithToken,
	ExchangeCodeTokenConfig
} from './exchangeCodeWithToken';
import qs from 'qs';
import { IAuthResponse, IApiError } from '../interfaces/network';

const mockHttpClient = {
	get: jest.fn(),
	post: jest.fn(async () => {
		const response = {
			data: {
				access_token: 'token',
				expires_in: 1,
				refresh_token: 'refresh-token',
				token_type: 'token-type'
			} as IAuthResponse
		};

		return Promise.resolve(response);
	})
};

const mockApiConfig: ExchangeCodeTokenConfig = {
	httpClient: mockHttpClient,
	redirect_uri: 'https://some.website.com:3030',
	code: 'code-123',
	auth_url: 'https://auth.truelayer.com',
	client_id: 'piggybank',
	client_secret: 'secret'
};

describe('exchangeCodeWithToken', () => {
	test('should post the correct options to the {auth_url}/connect/token endpoint', async () => {
		await exchangeCodeWithToken(mockApiConfig);

		expect(mockHttpClient.post).toHaveBeenCalledWith(
			'https://auth.truelayer.com/connect/token',
			qs.stringify({
				grant_type: 'authorization_code',
				client_id: 'piggybank',
				client_secret: 'secret',
				redirect_uri: 'https://some.website.com:3030',
				code: 'code-123'
			}),
			{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
		);
	});

	test('should return the access and refresh tokens', async () => {
		const response = await exchangeCodeWithToken(mockApiConfig);
		expect(response).toEqual({
			data: {
				access_token: 'token',
				expires_in: 1,
				refresh_token: 'refresh-token',
				token_type: 'token-type'
			}
		});
	});

	test('should catch api errors', async () => {
		mockHttpClient.post = jest.fn(async () => {
			const error: IApiError = { message: 'Server Error' };
			return Promise.reject(error);
		});
		await exchangeCodeWithToken(mockApiConfig).catch(e => {
			expect(e).toEqual({
				error: {
					message: 'Server Error'
				}
			});
		});
	});
});
