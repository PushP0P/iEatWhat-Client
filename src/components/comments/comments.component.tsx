import * as React from 'react';
import { ReactElement } from 'react';
import { CommentsComponentProps, CommentsComponentState } from '../../models/comments.model';
import { CommentsListContainer } from './comments-list/comments-list.container';

export class CommentsComponent extends React.Component<CommentsComponentProps, CommentsComponentState> {

	constructor(public props: CommentsComponentProps) {
		super(props);
		this.state = {
			comments: {}
		};
	}

	public render(): ReactElement<HTMLDivElement> {
		return(
			<div
				className="comments-component"
			>
				<div
					className="comments-header"
				>
					<h1>Comments</h1>
				</div>
				<form
					id="CommentForm"
				>
					<div
						className="comment-input"
						suppressContentEditableWarning={true}
						contentEditable={true}
					>
						Editable
					</div>
					<div
						className="controls"
					>
						<button
							className="btn btn-success btn-lg"
						>
							Submit
						</button>
					</div>

				</form>
				<div
					className="comments-list"
				>
					<CommentsListContainer id={'123foo'} viewId={this.props.viewId}/>
				</div>
			</div>
		);
	}

}
