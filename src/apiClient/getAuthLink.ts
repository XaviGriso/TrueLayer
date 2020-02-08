import { Scopes } from './types';

type AuthConfig = {
	scopes: Scopes[];
	auth_url?: string;
	client_id?: string;
	redirect_uri?: string;
};

export const getAuthLink = ({
	scopes = [],
	auth_url = process.env.auth_url || '',
	client_id = process.env.client_id || '',
	redirect_uri = process.env.redirect_uri || ''
}: AuthConfig): string => {
	if (!scopes.length) {
		return '';
	}

	const SCOPES = scopes.join('%20');

	const authUrl: string =
		`${auth_url}/?` +
		`response_type=code&` +
		`client_id=${client_id}&` +
		`scope=${SCOPES}&` +
		`redirect_uri=${redirect_uri}&` +
		`providers=uk-ob-all%20uk-oauth-all%20uk-cs-mock`;

	return authUrl;
};
