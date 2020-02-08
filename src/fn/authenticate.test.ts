import { authenticate } from './authenticate';
import client, { IClient } from '../apiClient';
import { TokenResponse } from '../apiClient/types';

jest.mock('../apiClient');

describe('authenticate', () => {
	const mockClient = client as jest.Mocked<typeof client>;
	mockClient.exchangeCodeWithToken.mockImplementation(async () =>
		Promise.resolve({
			access_token: 'access_token',
			refresh_token: 'refresh_token'
		} as TokenResponse)
	);

	test('should exchange the code with the tokens', async () => {
		const tokens = await authenticate('code', mockClient);
		expect(tokens).toEqual({
			access_token: 'access_token',
			refresh_token: 'refresh_token'
		});
	});
});
