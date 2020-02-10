import knex from 'knex';
import mockKnex from 'mock-knex';

const mockDb = knex({
	client: 'mysql'
});
const tracker = mockKnex.getTracker();
//https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36143
//@ts-ignore
mockKnex.mock(mockDb);

export default {
	client: mockDb,
	tracker
};
