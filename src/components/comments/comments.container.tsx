import * as React from 'react';
import { ReactElement } from 'react';
import { CommentsComponentProps, CommentsComponentState } from '../../models/comments.model';

export class CommentsComponent extends React.Component<CommentsComponentProps, CommentsComponentState> {

	constructor(public props: CommentsComponentProps) {
		super(props);
		this.state = {
			testFooBar: 'loading',
			comments: {}
		};
	}

	public componentDidMount(): void {
		this.setState({testFooBar: 'BAT METAL!'});
		this.getComments();
	}

	public render(): ReactElement<HTMLDivElement> {
		return(
			<div
				className={'comments-component ' + this.state.testFooBar}
			>
				<div
					className="comments-header"
				>
					<h3>Comment:</h3>
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
				</form>
				<div
					className="comments-list"
				>
					<h1>A List</h1>
					<h1>A List</h1>
					<h1>A List</h1>
					<h1>A List</h1>
					<h1>A List</h1>
					<h1>A List</h1>
				</div>
			</div>
		);
	}

	private async getComments(): Promise<void> {
		console.log('yes it is 56');
	}
}
