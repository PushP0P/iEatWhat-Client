import { CommentsList, CommentsListMeta, generateDemoComment } from '../models/comments.model';
import { StoreService } from './store.service';
const stores = new StoreService();

export async function getUserComments(): Promise<CommentsList> {
	// const userData = await stores.get('userData', 'account');
	// FIXTURES
	return {
		'Message123': generateDemoComment(stores.user.id || '123'),
		'Message143': generateDemoComment(stores.user.id || '123'),
		'Message423': generateDemoComment(stores.user.id || '123'),
	};
}

export async function getComments(listId: string): Promise<CommentsList> {
	// FIXTURES
	const responsePack = await getUserComments();
	const response: CommentsList = responsePack;
	// END
	return enableEditForUserComments(response, stores.user.id || '123');
}

export async function getCommentsListMeta(containerId: string): Promise<CommentsListMeta> {
	return {
		listId: containerId,
		topic: 'Demo',
	};
}

/**
 * Helpers
 */

function enableEditForUserComments(comments: CommentsList, userId: string): CommentsList {
	return Object.keys(comments).reduce(
		(agg: CommentsList, key: string) => {
			if (comments[key].userId === userId) {
				return {...{}, ...agg, [key]: {...comments[key], editable: true}};
			}
			return {...{}, ...agg, [key]: {...comments[key]}};
		},
		{}
	);
}
