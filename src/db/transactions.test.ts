import { setUserTransactions, getUserTransactions } from './transactions';
import { IAccountTransactions } from '../interfaces/data/transactions';

import knex from 'knex';
const db = knex({
	client: 'sqlite3',
	connection: { filename: ':memory:' },
	useNullAsDefault: true
});

const createUserTransactionsTable = async () =>
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

const mockTransaction = ({
	amount = 0,
	currency = 'CUR',
	description = 'transaction description',
	transaction_id = 'tid',
	timestamp = 'timestamp',
	transaction_type = 'TRT',
	transaction_category = 'CAT'
}) => ({
	amount,
	currency,
	description,
	transaction_id,
	timestamp,
	transaction_type,
	transaction_category
});

describe('transactions', () => {
	beforeAll(() => createUserTransactionsTable());

	describe('setUserTransactions', () => {
		test('should not duplicate rows', async () => {
			const transaction = mockTransaction({ amount: -12.99 });
			const mockAccountTransaction: IAccountTransactions = {
				account_id: 'aid',
				transactions: [
					{ ...transaction, meta: {}, transaction_classification: [] }
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
					...transaction
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
			const tr1 = mockTransaction({ amount: -12.99, transaction_id: 'tid-1' });
			const tr2 = mockTransaction({ amount: -40, transaction_id: 'tid-2' });
			const tr3 = mockTransaction({ amount: -0.99, transaction_id: 'tid-1' });

			const transactions = [
				{ user_id: 1, account_id: 'aid-1', ...tr1 },
				{ user_id: 1, account_id: 'aid-1', ...tr2 },
				{ user_id: 1, account_id: 'aid-2', ...tr3 }
			];

			await db('user_transactions').insert(transactions);
			const userTransactions = await getUserTransactions(1, db);
			const expected = [
				{
					account_id: 'aid-1',
					transactions: [
						{ id: 1, user_id: 1, ...tr1 },
						{ id: 2, user_id: 1, ...tr2 }
					]
				},
				{
					account_id: 'aid-2',
					transactions: [{ id: 3, user_id: 1, ...tr3 }]
				}
			];
			expect(userTransactions).toEqual(expected);
		});
	});
});
