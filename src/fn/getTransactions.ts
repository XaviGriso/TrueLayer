import {
	ITransaction,
	IAccount,
	IAccountTransactions
} from '../interfaces/data';
import apiClient, { IClient } from '../apiClient';

export const getTransactions = async (
	token: string,
	accounts: IAccount[] = [],
	client: IClient = apiClient
): Promise<IAccountTransactions[]> =>
	await Promise.all(
		accounts.map(
			async ({ account_id }) =>
				({
					account_id,
					transactions: await client.get<ITransaction>({
						token,
						path: `accounts/${account_id}/transactions`
					})
				} as IAccountTransactions)
		)
	);
