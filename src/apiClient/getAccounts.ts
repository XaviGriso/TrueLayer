import { IResult, IAccount, IApiCall } from './shared/interfaces';
import { call } from './shared/call';

export const getAccounts = async (
	config: IApiCall
): Promise<IResult<IAccount>> => call<IAccount>(config);
