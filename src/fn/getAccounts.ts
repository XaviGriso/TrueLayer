import apiClient, { IClient } from '../apiClient';
import { IAccount } from '../interfaces/data';

export const getAccounts = async (
	token: string,
	client: IClient = apiClient
): Promise<IAccount[]> =>
	await client.get<IAccount>({
		token,
		path: 'accounts'
	});
