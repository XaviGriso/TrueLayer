import { call } from './call';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('call', () => {
	test('should call an endpoint with the provided token', async () => {
		mockedAxios.get.mockImplementation(async () => {
			const response = {
				data: {
					results: {
						some: 'some',
						response: 'response'
					}
				}
			};

			return Promise.resolve(response);
		});

		await call({
			httpClient: mockedAxios,
			token: 'a-secret-token',
			path: 'path',
			api_url: 'https://api.url'
		});
		expect(mockedAxios.get).toHaveBeenCalledWith('https://api.url/path', {
			headers: { Authorization: 'Bearer a-secret-token' }
		});
	});
});
