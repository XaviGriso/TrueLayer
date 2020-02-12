import { authenticate } from './authenticate';
import client from '../apiClient';
import { IAuthResponse, IApiError } from '../interfaces/network';

jest.mock('../apiClient');

describe('authenticate', () => {
	const mockClient = client as jest.Mocked<typeof client>;

	test('should exchange the code with the access token', async () => {
		mockClient.exchangeCodeWithToken.mockImplementation(async () =>
			Promise.resolve({
				data: { access_token: 'access_token', refresh_token: 'refresh_token' }
			} as IAuthResponse)
		);

		const tokens = await authenticate('code', mockClient);
		expect(tokens).toBe('access_token');
	});

	test('should return undefined in case of errors', async () => {
		mockClient.exchangeCodeWithToken.mockImplementation(async () =>
			Promise.reject({ message: 'Server Error' } as IApiError)
		);

		const tokens = await authenticate('code', mockClient);
		expect(tokens).toBeUndefined();
	});
});
