import { getInfo } from './getInfo';
import client from '../apiClient';
import { IInfo } from '../interfaces/data/user';
import { IApiError } from '../interfaces/network';

jest.mock('../apiClient');

describe('getAccounts', () => {
	const mockClient = client as jest.Mocked<typeof client>;

	test('should return an array of user info', async () => {
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

		const info = await getInfo('token', mockClient);
		expect(info).toEqual({
			data: {
				results: [mockUserInfo]
			}
		});
	});

	test('should catch api errors', async () => {
		mockClient.get.mockImplementation(async () =>
			Promise.reject({ message: 'Server Error' } as IApiError)
		);

		await getInfo('token', mockClient).catch(e => {
			expect(e).toEqual({
				data: undefined,
				error: { message: 'Server Error' }
			});
		});
	});
});
