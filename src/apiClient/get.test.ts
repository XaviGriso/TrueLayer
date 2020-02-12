import { get } from './get';
import { IApiResponse, IApiError } from '../interfaces/network';

type mockRequestType = {
	prop1: string;
	prop2: number;
};

const mockHttpClient = {
	get: jest.fn(async () => {
		const response = {
			data: {
				results: {
					prop1: 'string response',
					prop2: 100
				} as mockRequestType
			} as IApiResponse<mockRequestType>
		};

		return Promise.resolve(response);
	}),
	post: jest.fn()
};

describe('get', () => {
	test('should call an endpoint with the provided token', async () => {
		await get({
			httpClient: mockHttpClient,
			token: 'a-secret-token',
			path: 'path',
			api_url: 'https://api.url/v1/'
		});

		expect(mockHttpClient.get).toHaveBeenCalledWith('https://api.url/v1/path', {
			headers: { Authorization: 'Bearer a-secret-token' }
		});
	});

	test('should return an api response with custom typed data', async () => {
		const response = await get({
			httpClient: mockHttpClient,
			token: 'a-secret-token',
			path: 'path',
			api_url: 'https://api.url/v1/'
		});

		expect(response.data).toEqual({
			results: { prop1: 'string response', prop2: 100 }
		});
	});

	test('should catch api errors', async () => {
		mockHttpClient.get = jest.fn(async () => {
			const error: IApiError = { message: 'Server Error' };
			return Promise.reject(error);
		});

		await get({
			httpClient: mockHttpClient,
			token: 'a-secret-token',
			path: 'path',
			api_url: 'https://api.url/v1/'
		}).catch(e => {
			expect(e).toEqual({
				error: {
					message: 'Server Error'
				}
			});
		});
	});
});
