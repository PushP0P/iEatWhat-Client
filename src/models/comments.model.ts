export interface CommentsComponentState {
	comments: CommentsListState;
	testFooBar: string;
}

export interface CommentsComponentProps {
	viewId: string;
	getComments: (viewId: string) => CommentsListState;
	editHandler: () => void;
}

export interface CommentsListProps {
	id: string;
	viewId: string;
	owningCommentId?: string,
}

export interface CommentsListState {
	[comment_id: string]: {
		comment: Comment,
		repliesListId?: string;
	};
}

export interface Comment {
	commentId: string;
	userId: string;
	create_date: number;
	text: string;
	replies: number;
	editable: boolean;
	deleted: boolean;
	reported: boolean;
	reports: number;
	likes: number;
}

export function generateDemoComment(): Comment {
	return {
		commentId: Math.random().toString(),
		userId: Math.random().toString(),
		create_date: Date.now(),
		text: `Lorem Ipsum Foo Bat Metal ${Math.random()} times`,
		replies: Math.random(),
		editable: false,
		deleted: false,
		reported: false,
		reports: 0,
		likes: 0
	};
}
