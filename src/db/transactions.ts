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
	return affectedRows;
};
