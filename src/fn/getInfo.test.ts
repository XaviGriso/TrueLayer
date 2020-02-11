import { getInfo } from './getInfo';
import client from '../apiClient';
import { IInfo } from '../interfaces/data';

jest.mock('../apiClient');

describe('getAccounts', () => {
	const mockClient = client as jest.Mocked<typeof client>;
	const mockUserInfo: IInfo = {
		full_name: 'John Doe',
		update_timestamp: 'timestamp'
	};

	mockClient.get.mockImplementation(async () =>
		Promise.resolve({
			data: {
				results: [mockUserInfo]
			}
		})
	);

	test('should return an array of user info', async () => {
		const info = await getInfo('token', mockClient);
		expect(info).toEqual({
			data: {
				results: [mockUserInfo]
			}
		});
	});
});
