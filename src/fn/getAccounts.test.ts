import { getAccounts } from './getAccounts';
import client from '../apiClient';
import { IAccount } from '../interfaces/data/account';
import { IApiError } from '../interfaces/network';

jest.mock('../apiClient');

describe('getAccounts', () => {
	const mockClient = client as jest.Mocked<typeof client>;
	const mockAccount = (account_id: string): IAccount => ({
		account_id,
		account_number: {
			iban: 'iban',
			number: 'acc-number',
			sort_code: 'sort-code'
		},
		provider: {
			display_name: 'name',
			logo_uri: 'logo://uri',
			provider_id: '1'
		},
		account_type: 'type',
		currency: 'CUR',
		update_timestamp: 'timestamp'
	});

	test('should return an array of accounts', async () => {
		const mockAccounts = [mockAccount('1'), mockAccount('2')];
		mockClient.get.mockImplementation(async () =>
			Promise.resolve({
				data: {
					results: mockAccounts
				}
			})
		);

		const accounts = await getAccounts('token', mockClient);
		expect(accounts).toEqual({
			data: { results: mockAccounts }
		});
	});

	test('should catch api errors', async () => {
		mockClient.get.mockImplementation(async () =>
			Promise.reject({ message: 'Server Error' } as IApiError)
		);

		await getAccounts('token', mockClient).catch(e => {
			expect(e).toEqual({
				data: undefined,
				error: { message: 'Server Error' }
			});
		});
	});
});
