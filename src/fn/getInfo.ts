import apiClient, { IClient } from '../apiClient';
import { IInfo } from '../interfaces/data/user';
import { IApiResponse } from '../interfaces/network';

type InfoResult = {
	results: IInfo[];
};

export const getInfo = (
	token: string,
	client: IClient = apiClient
): Promise<IApiResponse<InfoResult>> =>
	client
		.get<InfoResult>({
			token,
			path: 'info'
		})
		.then(response => response)
		.catch(e => e);
