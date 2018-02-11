export const STORE_NAMES = {
	user: 'userData',
	tokens: 'tokens',
	state: 'state'
};

export const STORE_CONFIG = {
	version: 1,
	dbName: 'dev-user-data',
	storeNames: Object.keys(STORE_NAMES).map(key => STORE_NAMES[key]),
	keyPath: 'uDKey'
};
