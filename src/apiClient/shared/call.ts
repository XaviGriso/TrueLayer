import { IApiCall, IResult } from './interfaces';

export const call = async <T>({
	httpClient,
	token,
	path,
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
