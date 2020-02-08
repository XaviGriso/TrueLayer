export enum Scopes {
	accounts = 'accounts',
	info = 'info',
	transactions = 'transactions'
}

export type TokenResponse = {
	access_token: string;
	refresh_token: string;
};

export type AuthResponse = {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	token_type: string;
};
