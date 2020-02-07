import {
	exchangeCodeWithToken,
	ExchangeCodeTokenConfig
} from './exchangeCodeWithToken';

import axios from 'axios';
import { AuthResponse, RequestOptions } from './shared/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
let mockOptions: RequestOptions;
let mockApiConfig: ExchangeCodeTokenConfig;

describe('exchangeCodeWithToken', () => {
	beforeAll(() => {
		mockedAxios.post.mockImplementation(async () => {
			const response: AuthResponse = {
				access_token: 'token',
				expires_in: 1,
				refresh_token: 'refresh-token',
				token_type: 'token-type'
			};

			return Promise.resolve(response);
		});

		mockOptions = {
			uri: 'https://auth.truelayer.com/connect/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			form: {
				grant_type: 'authorization_code',
				client_id: 'piggybank',
				client_secret: 'secret',
				redirect_uri: 'https://some.website.com:3030',
				code: 'code-123'
			}
		};

		mockApiConfig = {
			httpClient: mockedAxios,
			redirect_uri: 'https://some.website.com:3030',
			code: 'code-123',
			auth_url: 'https://auth.truelayer.com',
			client_id: 'piggybank',
			client_secret: 'secret'
		};
	});

	test('should post the correct options to the {auth_url}/connect/token endpoint', async () => {
		await exchangeCodeWithToken(mockApiConfig);
		expect(mockedAxios.post).toHaveBeenCalledWith(mockOptions);
	});

	test('should return the access and refresh tokens', async () => {
		const response = await exchangeCodeWithToken(mockApiConfig);
		expect(response).toEqual({
			access_token: 'token',
			refresh_token: 'refresh-token'
		});
	});

	test('should catch errors', async () => {
		mockedAxios.post.mockImplementation(async () =>
			Promise.reject({ message: 'Server Error' })
		);
		await exchangeCodeWithToken(mockApiConfig).catch(e => {
			expect(e).toEqual({ message: 'Server Error' });
		});
	});
});
