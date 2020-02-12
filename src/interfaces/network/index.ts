export interface IHTTPClient {
	get: any;
	post: any;
}

export interface IApiCall {
	token: string;
	path: string;
	httpClient?: IHTTPClient;
	api_url?: string;
}

export interface IApiError {
	response?: {
		data: object;
		status: number;
		headers: object;
	};
	request?: object;
	config?: object;
	message: string;
}

export interface IApiResponse<T> {
	data?: T;
	error?: IApiError;
}

export interface IAuthResponse
	extends IApiResponse<{
		access_token: string;
		expires_in: number;
		refresh_token: string;
		token_type: string;
	}> {}
