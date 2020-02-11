import apiClient, { IClient } from '../apiClient';
import { IInfo } from '../interfaces/data';

export const getInfo = (
	token: string,
	client: IClient = apiClient
): Promise<IInfo | undefined> =>
	client
		.get<{
			results: IInfo[];
		}>({
			token,
			path: 'info'
		})
		.then(response => response.data?.results[0])
		.catch(e => e);
