import { getAuthLink, AuthConfig } from './getAuthLink';
import {
	exchangeCodeWithToken,
	ExchangeCodeTokenConfig
} from './exchangeCodeWithToken';
import { get } from './get';
import { IApiCall, IAuthResponse, IApiResponse } from '../interfaces/network';

export interface IClient {
	getAuthLink: (config: AuthConfig) => string;
	exchangeCodeWithToken: (
		config: ExchangeCodeTokenConfig
	) => Promise<IAuthResponse>;
	get: <T>(config: IApiCall) => Promise<IApiResponse<T>>;
}

const Client: IClient = {
	getAuthLink,
	exchangeCodeWithToken,
	get
};

export default Client;
