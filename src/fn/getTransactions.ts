import {
	ITransaction,
	IAccount,
	IAccountTransactions
} from '../interfaces/data';
import apiClient, { IClient } from '../apiClient';
import { IApiResponse } from '../interfaces/network';

type TransactionsResult = {
	results: ITransaction[];
};

export const getAccountTransactions = (
	account_id: string,
	token: string,
	client: IClient = apiClient
): Promise<IApiResponse<TransactionsResult>> =>
	client
		.get<TransactionsResult>({
			token,
			path: `accounts/${account_id}/transactions`
		})
		.then(response => response || [])
		.catch(e => e);

const accountTransactionsData = async (
	account_id: string,
	token: string,
	client: IClient = apiClient
): Promise<ITransaction[]> => {
	const { data } = await getAccountTransactions(account_id, token, client);
	return data?.results || [];
};

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
					transactions: await accountTransactionsData(account_id, token, client)
				} as IAccountTransactions)
		)
	);
