import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

export default knex({
	client: 'mysql',
	connection: {
		host: process.env.db_host,
		port: +(process.env.db_port || 3306),
		user: process.env.db_user,
		password: process.env.db_pwd,
		database: process.env.db_name
	}
});
