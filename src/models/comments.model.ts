export interface CommentProps {
	commentId: string;
	name: string;
	userId: string;
	create_date: number;
	text: string;
	editable: boolean;
	removed: boolean;
	reported: boolean;
	reports: number;
	likes: number;
	replies?: CommentsList;
}

export interface CommentsComponentState {
	dataReady: boolean;
	commentListMeta: CommentsListProps;
}

export interface CommentsComponentProps {
	viewId: string;
}

export const COMMENTS_COMPONENT_STATE_INIT: CommentsComponentState = {
	dataReady: false,
	commentListMeta: <CommentsListProps> {}
};

export interface CommentsListProps {
	id?: string;
	topic: string;
	containerId: string;
}

export interface CommentsListState {
	dataReady: boolean;
	comments: CommentsList;
}

export interface CommentsList {
	[commentId: string]: CommentProps;
}

export const COMMENTS_LIST_STATE_INIT = {
	dataReady: false,
	comments: {}
};

export const FIXTURE_COMMENTS_LIST: CommentsList = {
	testComment0: generateDemoComment(),
	testComment1: generateDemoComment(),
	testComment2: generateDemoComment(),
};

export function generateDemoComment(userId?: string): CommentProps {
	return {
		commentId: Math.random().toString(),
		name: 'Demo Dave',
		userId: userId || Math.random().toString(),
		create_date: Date.now(),
		text: `Lorem Ipsum Foo Bat Metal ${Math.random()} times`,
		editable: false,
		removed: false,
		reported: false,
		reports: 0,
		likes: 0
	};
}
