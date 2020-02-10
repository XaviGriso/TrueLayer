import { setUserTransactions } from './transactions';
import { IAccountTransactions, ITransaction } from '../interfaces/data';

import knex from 'knex';
const db = knex({
	client: 'sqlite3',
	connection: { filename: ':memory:' },
	useNullAsDefault: true
});

describe('setUserTransactions', () => {
	beforeAll(async () => {
		await db.schema.createTable('user_transactions', table => {
			table.increments();
			table.integer('user_id');
			table.string('account_id');
			table.decimal('amount');
			table.string('currency'), table.string('description');
			table.string('transaction_id');
			table.string('timestamp');
			table.string('transaction_type');
			table.string('transaction_category');
			table.unique(['user_id', 'account_id', 'transaction_id']);
		});
	});

	test('should not duplicate rows', async () => {
		const mockAccountTransaction: IAccountTransactions = {
			account_id: 'aid',
			transactions: [
				{
					amount: -12.99,
					currency: 'CUR',
					description: 'transaction description',
					transaction_id: 'tid',
					timestamp: 'timestamp',
					transaction_type: 'TRT',
					transaction_category: 'CAT',
					meta: {},
					transaction_classification: []
				}
			]
		};

		await setUserTransactions(
			1,
			[mockAccountTransaction, mockAccountTransaction],
			db
		);
		const rows = await db('user_transactions').select('*');
		expect(rows).toEqual([
			{
				id: 1,
				user_id: 1,
				account_id: 'aid',
				amount: -12.99,
				currency: 'CUR',
				description: 'transaction description',
				transaction_id: 'tid',
				timestamp: 'timestamp',
				transaction_type: 'TRT',
				transaction_category: 'CAT'
			}
		]);
	});
});
