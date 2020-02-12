import { IApiCall, IApiResponse } from '../interfaces/network';
import axios from 'axios';
import { ApiError } from './apiError';

export const get = <T>({
	token,
	path,
	httpClient = axios,
	api_url = process.env.api_url || ''
}: IApiCall): Promise<IApiResponse<T>> =>
	httpClient
		.get(`${api_url}${path}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then((response: IApiResponse<T>) => response)
		.catch((error: any) => Promise.reject(ApiError(error)));
