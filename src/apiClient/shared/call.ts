import { IApiCall, IResult } from './interfaces';
import axios from 'axios';

export const call = async <T>({
	token,
	path,
	httpClient = axios,
	api_url = process.env.api_url || ''
}: IApiCall): Promise<IResult<T>> => {
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
