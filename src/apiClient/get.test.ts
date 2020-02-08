import { get } from './get';

const mockHttpClient = {
	get: jest.fn(async () => {
		const response = {
			data: {
				results: {
					some: 'some',
					response: 'response'
				}
			}
		};

		return Promise.resolve(response);
	}),
	post: jest.fn()
};

describe('call', () => {
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
});
