import { getAuthLink } from './getAuthLink';
import { Scopes } from './types';

describe('getAuthLink', () => {
	test('should not return the auth url with empty scopes', () => {
		expect(getAuthLink({ scopes: [] })).toBe('');
	});

	test('should return the auth url when the config is complete', () => {
		expect(
			getAuthLink({
				scopes: [Scopes.transactions],
				auth_url: 'https://auth.truelayer.com',
				client_id: 'piggybank',
				redirect_uri: 'https://some.website.com:3030'
			})
		).toBe(
			'https://auth.truelayer.com/?response_type=code&client_id=piggybank&scope=transactions&redirect_uri=https://some.website.com:3030&providers=uk-ob-all%20uk-oauth-all%20uk-cs-mock'
		);
	});
});
