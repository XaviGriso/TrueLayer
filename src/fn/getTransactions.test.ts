import { getTransactions } from './getTransactions';
import client from '../apiClient';
import { ITransaction, IAccount } from '../interfaces/data';

jest.mock('../apiClient');

describe('getTransactions', () => {
	const mockClient = client as jest.Mocked<typeof client>;
	const mockTransaction: ITransaction = {
		amount: 100,
		currency: 'CUR',
		description: 'spending',
		meta: {},
		timestamp: 'timestamp',
		transaction_category: 'category',
		transaction_id: '1',
		transaction_type: 'type',
		transaction_classification: []
	};

	mockClient.get.mockImplementation(async () =>
		Promise.resolve([mockTransaction] as ITransaction[])
	);

	test('shold return transactions grouped by account', async () => {
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

		const transactions = await getTransactions(
			'token',
			[mockAccount],
			mockClient
		);
		expect(transactions).toEqual([
			{ account_id: '1', transactions: [mockTransaction] }
		]);
	});
});
