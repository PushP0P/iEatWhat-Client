import { CommentsList, CommentsListProps, FIXTURE_COMMENTS_LIST, generateDemoComment } from '../models/comments.model';

export async function getUserComments(userId: string): Promise<CommentsList> {
	return {
		'Message123': generateDemoComment(),
		'Message143': generateDemoComment(),
		'Message423': generateDemoComment(),
	};
}

export async function getComments(listId: string): Promise<CommentsList> {
	return FIXTURE_COMMENTS_LIST;
}

export async function getCommentsListMeta(containerId: string): Promise<CommentsListProps> {
	// TODO make request

	return {
		id: 'FooBat123',
		topic: 'Demo',
		containerId: containerId,
	};
}
