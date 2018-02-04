import * as React from 'react';
import {ReactElement} from 'react';
import {CommentsListProps, CommentsListState} from '../../../models/comments.model';

export class CommentsListContainer extends React.Component<CommentsListProps, CommentsListState> {

	constructor(public props: CommentsListProps) {
		super(props);
	}

	public render(): ReactElement<HTMLDivElement> {
		return(
			<div
				className="comments-list"
			>

			</div>
		)
	}

}
