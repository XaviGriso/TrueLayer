import apiClient, { IClient } from '../apiClient';
import { IInfo } from '../interfaces/data';

export const getInfo = async (
	token: string,
	client: IClient = apiClient
): Promise<IInfo[]> =>
	await client.get<IInfo>({
		token,
		path: 'info'
	});
