import {
	ITransaction,
	IAccount,
	IAccountTransactions
} from '../interfaces/data';
import apiClient, { IClient } from '../apiClient';

const getAccountTransactions = (
	account_id: string,
	token: string,
	client: IClient = apiClient
) =>
	client
		.get<{
			results: ITransaction[];
		}>({
			token,
			path: `accounts/${account_id}/transactions`
		})
		.then(response => response.data?.results || [])
		.catch(e => e);

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
					transactions: await getAccountTransactions(account_id, token, client)
				} as IAccountTransactions)
		)
	);
