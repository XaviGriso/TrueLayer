export interface IUser extends IInfo {
	id: number;
	token: string;
}

export interface IInfo {
	addresses?: IAddressInfo[];
	date_of_birth?: string;
	emails?: string[];
	full_name: string;
	phones?: string[];
	update_timestamp?: string;
}

export interface IAddressInfo {
	address?: string;
	city?: string;
	country?: string;
	state?: string;
	zip?: string;
}
