import { IApiError } from '../interfaces/network';

export const ApiError = (error: any): { error: IApiError } => ({
	error: {
		response: error.response
			? {
					data: error.response.data,
					status: error.response.status,
					headers: error.response.headers
			  }
			: undefined,
		request: error.request,
		config: error.config,
		message: error.message
	}
});
