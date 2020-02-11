import apiClient, { IClient } from '../apiClient';
import { IAccount } from '../interfaces/data';

export const getAccounts = (
	token: string,
	client: IClient = apiClient
): Promise<IAccount[]> =>
	client
		.get<{
			results: IAccount[];
		}>({
			token,
			path: 'accounts'
		})
		.then(response => response.data?.results || [])
		.catch(e => e);
