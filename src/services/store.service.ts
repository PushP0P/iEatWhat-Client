import { STORE_CONFIG, STORE_NAMES } from '../configs/store.config';
import { openIDBUtilities } from 'indexed-db-utilities/dist/utilities/index-db.utility';
import { IDBUtility } from 'indexed-db-utilities/dist/models/idb-utility.model';
import { CommentsList } from '../models/comments.model';

interface UserStore {
	id: string;
	firstName: string;
	lastName: string;
	name: string;
	email: string;
	photoURL: string;
	searchConstraints: string[];
	commentsHistory: CommentsList;
	signedIn: boolean;
}

interface TokenStore {
	googleAccess: string;
	googleRefresh: string;
	twitterAccess: string;
	twitterRefresh: string;
	session: string;
}

export class StoreService {
	public stores: IDBUtility;
	public user: UserStore = <UserStore> {};
	public tokens: TokenStore = <TokenStore> {};

	public constructor() {
		openIDBUtilities(STORE_CONFIG)
			.then(stores => {
				this.stores = stores;
				this.user = <UserStore> {
					...this.user,
					...this.initializeCachedValues(STORE_NAMES.user)
				};
				this.tokens = <TokenStore> {
					...this.tokens,
					...this.initializeCachedValues(STORE_NAMES.tokens)
				};
			}
		);
	}

	public async setStore(storeName: 'user' | 'tokens', props: {}): Promise<void> {
		Object.keys(props)
			.forEach(async (key: string) => {
				await this.stores.put(
					storeName,
					{[key]: props[key]}
				);
			}
		);
		this[storeName] = {...this[storeName], ...props};
	}

	private async initializeCachedValues(store: string): Promise<{}> {
		const values = await this.stores.getAll(store);
		return Object.keys(values)
			.reduce(
				(agg: {}, key: string): {} => {
					agg = {...agg, [key]: values[key]};
					return agg;
				},
				{}
			);
	}
}
