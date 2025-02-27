import apiClient, { IClient } from '../apiClient';

export const authenticate = async (
	code: string,
	client: IClient = apiClient
): Promise<string | undefined> =>
	await client
		.exchangeCodeWithToken({ code })
		.then(({ data }) => (data ? data.access_token : undefined))
		.catch(() => undefined);
