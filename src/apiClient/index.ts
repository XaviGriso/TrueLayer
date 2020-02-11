import { getAuthLink, AuthConfig } from './getAuthLink';
import {
	exchangeCodeWithToken,
	ExchangeCodeTokenConfig
} from './exchangeCodeWithToken';
import { get } from './get';
import { IApiCall, IAuthResponse } from '../interfaces/network';

export interface IClient {
	getAuthLink: (config: AuthConfig) => string;
	exchangeCodeWithToken: (
		config: ExchangeCodeTokenConfig
	) => Promise<IAuthResponse>;
	get: <T>({ token, path, httpClient, api_url }: IApiCall) => Promise<T[]>;
}

const Client: IClient = {
	getAuthLink,
	exchangeCodeWithToken,
	get
};

export default Client;
