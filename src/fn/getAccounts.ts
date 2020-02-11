import apiClient, { IClient } from '../apiClient';
import { IAccount } from '../interfaces/data';
import { IApiResponse } from '../interfaces/network';

type AccountsResult = {
	results: IAccount[];
};

export const getAccounts = (
	token: string,
	client: IClient = apiClient
): Promise<IApiResponse<AccountsResult>> =>
	client
		.get<AccountsResult>({
			token,
			path: 'accounts'
		})
		.then(response => response)
		.catch(e => e);
