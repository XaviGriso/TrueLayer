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

export interface IAccount {
	account_id: string;
	account_number: IAccountNumber;
	account_type: string;
	currency: string;
	description?: string;
	display_name?: string;
	provider: IProvider;
	update_timestamp: string;
}

export interface IAccountNumber {
	iban: string;
	number: string;
	sort_code: string;
	swift_bic?: string;
}

export interface IProvider {
	display_name: string;
	logo_uri: string;
	provider_id: string;
}

export interface ITransaction {
	amount: number;
	currency: string;
	description: string;
	transaction_id: string;
	meta: object;
	timestamp: string;
	transaction_type: string;
	transaction_category: string;
}

export interface IAccountTransactions {
	account_id: string;
	transactions: ITransaction[];
}
