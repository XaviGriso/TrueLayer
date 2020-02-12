import mockDb from './mockDb';
import { getUserById, getUserByFullName, setUser } from './users';

describe('users', () => {
	beforeAll(() => mockDb.tracker.install());

	describe('getUserById', () => {
		test('returns the user when existing', async () => {
			mockDb.tracker.on('query', query => {
				query.response([{ id: 1, full_name: 'John Doe', token: 'last-token' }]);
			});

			const user = await getUserById(1, mockDb.client);
			expect(user).toEqual([
				{ id: 1, full_name: 'John Doe', token: 'last-token' }
			]);
		});

		test('returns [] when the user does not exist', async () => {
			mockDb.tracker.on('query', query => {
				query.response([]);
			});

			const user = await getUserById(1, mockDb.client);
			expect(user).toEqual([]);
		});
	});

	describe('getUserByFullName', () => {
		test('returns the user when existing', async () => {
			mockDb.tracker.on('query', query => {
				query.response([{ id: 1, full_name: 'John Doe', token: 'last-token' }]);
			});

			const user = await getUserByFullName('John Doe', mockDb.client);
			expect(user).toEqual([
				{ id: 1, full_name: 'John Doe', token: 'last-token' }
			]);
		});

		test('returns [] when the user does not exist', async () => {
			mockDb.tracker.on('query', query => {
				query.response([]);
			});

			const user = await getUserByFullName('John Doe', mockDb.client);
			expect(user).toEqual([]);
		});
	});

	describe('setUser', () => {
		test('does not insert when a user is already existing', async () => {
			mockDb.tracker.on('query', query => {
				query.response([{ id: 1, full_name: 'John Doe' }]);
			});
			await setUser({ full_name: 'Foo Bar' }, 'token-new', mockDb.client);
			const spyInsert = jest.spyOn(mockDb.client, 'insert');
			expect(spyInsert).toHaveBeenCalledTimes(0);
		});

		test('inserts a new user if not existing', async () => {
			mockDb.tracker.on('query', query => {
				query.response([]);
			});
			await setUser({ full_name: 'Foo Bar' }, 'token', mockDb.client);
			const spyInsert = jest.spyOn(mockDb.client, 'insert');
			expect(spyInsert).toHaveBeenCalledWith({
				full_name: 'Foo Bar',
				token: 'token'
			});
		});
	});

	afterAll(() => beforeAll(() => mockDb.tracker.install()));
});
