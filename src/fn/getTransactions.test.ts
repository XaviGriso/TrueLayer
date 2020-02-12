import { getTransactions, getAccountTransactions } from './getTransactions';
import client from '../apiClient';
import { IAccount } from '../interfaces/data/account';
import { ITransaction } from '../interfaces/data/transactions';
import { IApiError } from '../interfaces/network';

jest.mock('../apiClient');
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

mockClient.get.mockImplementation(async () => {
	return Promise.resolve({
		data: {
			results: [mockTransaction]
		}
	});
});

describe('getTransactions', () => {
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

describe('getAccountTransactions', () => {
	test('should return an array of transactions', async () => {
		const transactions = await getAccountTransactions(
			'account-1',
			'token',
			mockClient
		);
		expect(transactions).toEqual({
			data: { results: [mockTransaction] }
		});
	});

	test('should catch api errors', async () => {
		mockClient.get.mockImplementation(async () =>
			Promise.reject({ message: 'Server Error' } as IApiError)
		);

		await getAccountTransactions('account-1', 'token', mockClient).catch(e => {
			expect(e).toEqual({
				data: undefined,
				error: { message: 'Server Error' }
			});
		});
	});
});
