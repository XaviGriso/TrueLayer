import { setUserTransactions, getUserTransactions } from './transactions';
import { IAccountTransactions } from '../interfaces/data';

import knex from 'knex';
const db = knex({
	client: 'sqlite3',
	connection: { filename: ':memory:' },
	useNullAsDefault: true
});

describe('transactions', () => {
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

	describe('setUserTransactions', () => {
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

	describe('getUserTransactions', () => {
		beforeEach(async () => await db('user_transactions').truncate());

		test('should return an empty array if there are no transactions', async () => {
			const transactions = await getUserTransactions(100);
			expect(transactions).toEqual([]);
		});

		test('should return the transactions grouped by account', async () => {
			const transactions = [
				{
					user_id: 1,
					account_id: 'aid-1',
					amount: -12.99,
					currency: 'CUR',
					description: 'transaction description',
					transaction_id: 'tid-1',
					timestamp: 'timestamp',
					transaction_type: 'TRT',
					transaction_category: 'CAT'
				},
				{
					user_id: 1,
					account_id: 'aid-1',
					amount: -40,
					currency: 'CUR',
					description: 'transaction description',
					transaction_id: 'tid-2',
					timestamp: 'timestamp',
					transaction_type: 'TRT',
					transaction_category: 'CAT'
				},
				{
					user_id: 1,
					account_id: 'aid-2',
					amount: -0.99,
					currency: 'CUR',
					description: 'transaction description',
					transaction_id: 'tid-1',
					timestamp: 'timestamp',
					transaction_type: 'TRT',
					transaction_category: 'CAT'
				}
			];
			await db('user_transactions').insert(transactions);
			const userTransactions = await getUserTransactions(1, db);
			const expected = [
				{
					account_id: 'aid-1',
					transactions: [
						{
							id: 1,
							user_id: 1,
							amount: -12.99,
							currency: 'CUR',
							description: 'transaction description',
							transaction_id: 'tid-1',
							timestamp: 'timestamp',
							transaction_type: 'TRT',
							transaction_category: 'CAT'
						},
						{
							id: 2,
							user_id: 1,
							amount: -40,
							currency: 'CUR',
							description: 'transaction description',
							transaction_id: 'tid-2',
							timestamp: 'timestamp',
							transaction_type: 'TRT',
							transaction_category: 'CAT'
						}
					]
				},
				{
					account_id: 'aid-2',
					transactions: [
						{
							id: 3,
							user_id: 1,
							amount: -0.99,
							currency: 'CUR',
							description: 'transaction description',
							transaction_id: 'tid-1',
							timestamp: 'timestamp',
							transaction_type: 'TRT',
							transaction_category: 'CAT'
						}
					]
				}
			];
			expect(userTransactions).toEqual(expected);
		});
	});
});
