export interface CommentsComponentState {
	comments: CommentsListState;
}

export interface CommentsComponentProps {
	viewId: string;
}

export interface CommentsListProps {
	id: string;
	viewId: string;
	owningCommentId?: string;
}

export interface CommentsListState {
	[comment_id: string]: {
		comment: CommentProps;
		repliesListId?: string;
	};
}

export interface CommentProps {
	commentId: string;
	name: string;
	userId: string;
	create_date: number;
	text: string;
	replies: number;
	editable: boolean;
	removed: boolean;
	reported: boolean;
	reports: number;
	likes: number;
}

export function generateDemoComment(): CommentProps {
	return {
		commentId: Math.random().toString(),
		name: 'Demo Dave',
		userId: Math.random().toString(),
		create_date: Date.now(),
		text: `Lorem Ipsum Foo Bat Metal ${Math.random()} times`,
		replies: Math.random(),
		editable: false,
		removed: false,
		reported: false,
		reports: 0,
		likes: 0
	};
}

export const FIXTURE_COMMENTS_LIST_STATE: CommentsListState = {
	testComment0: {
		comment: generateDemoComment(),
	},
	testComment1: {
		comment: generateDemoComment(),
		repliesListId: 'replies0'
	},
	testComment2: {
		comment: generateDemoComment()
	}
};
export const FIXTURE_COMMENTS_LIST_PROPS: CommentsListProps = {
	id: 'testList0',
	viewId: 'testView'
};
export const FIXTURE_REPLY_LIST_PROPS: CommentsListProps = {
	id: 'testReplyList0',
	viewId: 'testView',
	owningCommentId: 'testComment1'
};
