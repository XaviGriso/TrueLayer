import { get } from './get';
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

		await get({
			httpClient: mockedAxios,
			token: 'a-secret-token',
			path: 'path',
			api_url: 'https://api.url/v1/'
		});
		expect(mockedAxios.get).toHaveBeenCalledWith('https://api.url/v1/path', {
			headers: { Authorization: 'Bearer a-secret-token' }
		});
	});
});
