import { CommentsList, CommentsListProps, generateDemoComment } from '../models/comments.model';

export async function getUserComments(userId: string): Promise<CommentsList> {
	return {
		'Message123': generateDemoComment(),
		'Message143': generateDemoComment(),
		'Message423': generateDemoComment(),
	};
}

export async function getComments(listId: string): Promise<CommentsList> {
	const response = await fetch('//localhost:5000/demo');
	console.log('I THINK THIS SHOWS IN TEST', response);
	return response.json();
}

export async function getCommentsListMeta(containerId: string): Promise<CommentsListProps> {
	// TODO make request

	return {
		id: 'FooBat123',
		topic: 'Demo',
		containerId: containerId,
	};
}
