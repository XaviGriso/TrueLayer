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
