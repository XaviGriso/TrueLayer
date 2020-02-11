import db from '.';
import { IAccountTransactions } from '../interfaces/data';

export const setUserTransactions = async (
	user_id: number,
	accountTransactions: IAccountTransactions[],
	dbClient = db
): Promise<number> => {
	const records = accountTransactions.map(({ account_id, transactions }) =>
		transactions.map(
			({
				amount,
				currency,
				description,
				transaction_id,
				timestamp,
				transaction_type,
				transaction_category
			}) => ({
				user_id,
				account_id,
				amount,
				currency,
				description,
				transaction_id,
				timestamp,
				transaction_type,
				transaction_category
			})
		)
	);

	let affectedRows = 0;
	for (let i = 0; i < records.length; i++) {
		if (records[i].length) {
			const ignore =
				dbClient.client.config.client === 'sqlite3' ? 'or ignore' : 'ignore';
			const insertIgnore = dbClient
				.insert(records[i])
				.into('user_transactions')
				.toString()
				.replace('insert', `insert ${ignore}`);

			const [result] = await dbClient.raw(insertIgnore);
			affectedRows += result ? result.affectedRows : 0;
		}
	}
	return affectedRows;
};

export const getUserTransactions = async (
	user_id: number,
	dbClient = db
): Promise<IAccountTransactions[]> => {
	const userTransactions = await dbClient('user_transactions')
		.where('user_id', user_id)
		.orderBy('account_id');

	let last_account = '';
	const accountTransactions: IAccountTransactions[] = [];
	userTransactions.forEach(({ account_id, ...rest }) => {
		if (account_id !== last_account) {
			last_account = account_id;
			accountTransactions.push({
				account_id,
				transactions: [{ ...rest }]
			});
		} else {
			accountTransactions[accountTransactions.length - 1].transactions.push({
				...rest
			});
		}
	});

	return accountTransactions;
};
