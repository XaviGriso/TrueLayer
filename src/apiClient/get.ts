import { IApiCall } from '../interfaces/network';
import axios from 'axios';

export const get = async <T>({
	token,
	path,
	httpClient = axios,
	api_url = process.env.api_url || ''
}: IApiCall): Promise<T[]> => {
	try {
		const { data } = await httpClient.get(`${api_url}${path}`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		return data.results;
	} catch (error) {
		console.log('Error calling the endpoint ', path, error);
		throw error;
	}
};
