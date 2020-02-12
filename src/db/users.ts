import db from '.';
import { IInfo, IUser } from '../interfaces/data/user';

export const getUserById = async (
	id: number,
	dbClient = db
): Promise<IUser[]> =>
	await dbClient
		.select<IUser[]>('id', 'full_name', 'token')
		.from('users')
		.where('id', id);

export const getUserByFullName = async (
	fullName: string,
	dbClient = db
): Promise<IUser[]> =>
	await dbClient
		.select<IUser[]>('id', 'full_name', 'token')
		.from('users')
		.where('full_name', fullName);

export const setUser = async (
	userInfo: IInfo,
	token: string,
	dbClient = db
): Promise<number> => {
	const [existUser] = await getUserByFullName(userInfo.full_name, dbClient);
	if (!existUser) {
		const { id }: { id: number } = await dbClient
			.insert({
				...userInfo,
				token
			})
			.into('users');
		return id;
	} else {
		await dbClient
			.table('users')
			.update({ token })
			.where({ id: existUser.id });
	}

	return existUser.id;
};
