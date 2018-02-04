import {Action} from '../../../models/action.model';
import {CommentsComponentState, CommentsListState} from '../../../models/comments.model';

export function commentsListReducer(action: Action, currentState: CommentsComponentState): CommentsComponentState {
	switch(action.type) {
		case'ADD_COMMENT':
			const addedComments = Object.assign(
				{},
				currentState.comments,
				action.payload
			);
			return {...{}, ...currentState, comments: addedComments};
		case'REMOVE_COMMENT':
			const removedComments: CommentsListState = Object.keys(currentState.comments)
				.map(commentId => {
					if (commentId === action.payload) {
						return {...{}, ...currentState.comments[commentId]}
					}
				});
			return;
		default:
			return currentState;
	}
}
