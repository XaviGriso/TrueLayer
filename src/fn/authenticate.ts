import apiClient, { IClient } from '../apiClient';
import { TokenResponse } from '../apiClient/types';

export const authenticate = async (
	code: string,
	client: IClient = apiClient
): Promise<TokenResponse> => await client.exchangeCodeWithToken({ code });
