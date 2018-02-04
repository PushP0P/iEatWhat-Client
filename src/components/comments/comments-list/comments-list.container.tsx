import * as React from 'react';
import { ReactElement } from 'react';
import { CommentsListProps, CommentsListState } from '../../../models/comments.model';
import { FIXTURE_COMMENTS_LIST_STATE } from './comments-list.test';
import { CommentComponent } from '../comment.controlled';

export class CommentsListContainer extends React.Component<CommentsListProps, CommentsListState> {

	constructor(public props: CommentsListProps) {
		super(props);
		this.state = FIXTURE_COMMENTS_LIST_STATE;
	}

	// public componentDidMount(): void {
	// }

	public render(): ReactElement<HTMLDivElement> {

		return(
			<div
				className="comments-list"
			>
				{Object.keys(this.state).map((commentId: string) => {
					return (
						<CommentComponent
							key={commentId}
							{...this.state[commentId].comment}
						/>
					);
				})}
			</div>
		);
	}
}
