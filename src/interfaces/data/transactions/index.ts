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
