export enum Scopes {
	info = 'info',
	transactions = 'transactions'
}

export interface IAuthConfig {
	scopes: Scopes[];
	auth_url?: string;
	client_id?: string;
	redirect_uri?: string;
}
