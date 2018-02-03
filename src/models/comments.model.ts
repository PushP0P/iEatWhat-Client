export interface CommentsComponentState {
	comments: CommentsList;
	testFooBar: string;
}

// Note: ids are *_id when being sent or received form a DB.
// and camelCased when we are passing them internally. -r
export interface CommentsComponentProps {
	view_id: string;
	getComments: (viewId: string) => CommentsList;
	editHandler: () => void;
}

export interface CommentsList {
	[comment_id: string]: {
		comment: Comment,
		replies?: CommentsList
	};
}

export interface Comment {
	comment_id: string;
	user_id: string;
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
		comment_id: Math.random().toString(),
		user_id: Math.random().toString(),
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
