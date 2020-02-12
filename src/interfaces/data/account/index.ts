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
