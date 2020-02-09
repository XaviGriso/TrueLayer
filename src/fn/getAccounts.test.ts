import { getAccounts } from './getAccounts';
import client from '../apiClient';
import { IAccount } from '../interfaces/data';

jest.mock('../apiClient');

describe('getAccounts', () => {
	const mockClient = client as jest.Mocked<typeof client>;
	const mockAccount: IAccount = {
		account_id: '1',
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
	};

	mockClient.get.mockImplementation(async () =>
		Promise.resolve([mockAccount] as IAccount[])
	);

	test('should return an array of accounts', async () => {
		const accounts = await getAccounts('token', mockClient);
		expect(accounts).toEqual([mockAccount]);
	});
});
