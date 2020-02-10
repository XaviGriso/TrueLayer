import db from '.';
import { IInfo, IUser } from '../interfaces/data';

export const getUserByFullName = async (
	fullName: string,
	dbClient = db
): Promise<IUser[]> =>
	await dbClient
		.select<IUser[]>('id', 'full_name')
		.from('users')
		.where('full_name', fullName);

export const setUser = async (
	userInfo: IInfo,
	dbClient = db
): Promise<number> => {
	const [existUser] = await getUserByFullName(userInfo.full_name, dbClient);
	if (!existUser) {
		const { id }: { id: number } = await dbClient
			.insert(userInfo)
			.into('users');
		return id;
	}

	return existUser.id;
};
