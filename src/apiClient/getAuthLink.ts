import { IAuthConfig } from './types';

export const getAuthLink = ({
	scopes = [],
	auth_url = 'https://auth.truelayer-sandbox.com',
	client_id = process.env.client_id || '',
	redirect_uri = process.env.redirect_uri || ''
}: IAuthConfig): string => {
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
