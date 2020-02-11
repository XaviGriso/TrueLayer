import { authenticate } from './authenticate';
import client from '../apiClient';
import { IAuthResponse } from '../interfaces/network';

jest.mock('../apiClient');

describe('authenticate', () => {
	const mockClient = client as jest.Mocked<typeof client>;
	mockClient.exchangeCodeWithToken.mockImplementation(async () =>
		Promise.resolve({
			data: { access_token: 'access_token', refresh_token: 'refresh_token' }
		} as IAuthResponse)
	);

	test('should exchange the code with the access token', async () => {
		const tokens = await authenticate('code', mockClient);
		expect(tokens).toBe('access_token');
	});
});
