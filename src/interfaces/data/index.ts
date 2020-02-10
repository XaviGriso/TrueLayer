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
	timestamp: string;
	transaction_type: string;
	transaction_category: string;
	meta: object;
	transaction_classification: string[];
}

export interface IAccountTransactions {
	account_id: string;
	transactions: ITransaction[];
}

export interface IUser extends IInfo {
	id: number;
}

export interface IInfo {
	addresses?: IAddressInfo[];
	date_of_birth?: string;
	emails?: string[];
	full_name: string;
	phones?: string[];
	update_timestamp?: string;
}

export interface IAddressInfo {
	address?: string;
	city?: string;
	country?: string;
	state?: string;
	zip?: string;
}
