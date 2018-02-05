import * as React from 'react';
import { ReactElement } from 'react';
import {
	COMMENTS_COMPONENT_STATE_INIT, CommentsComponentProps,
	CommentsComponentState
} from '../../models/comments.model';
import { CommentsListContainer } from './comments-list/comments-list.container';
import { getCommentsListMeta } from '../../services/comments.service';

export class CommentsComponent extends React.Component<CommentsComponentProps, CommentsComponentState> {

	constructor(public props: CommentsComponentProps) {
		super(props);
		this.state = COMMENTS_COMPONENT_STATE_INIT;
	}

	public async componentDidMount(): Promise<void> {
		const listMeta = await getCommentsListMeta(this.props.viewId);
		this.setState({
			commentListMeta: listMeta,
			dataReady: true
		});
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
					{this.state.dataReady
						? <CommentsListContainer
							{...this.state.commentListMeta}
						/> : <div>
							Loading Comments .......
						</div>
					}
				</div>
			</div>
		);
	}
}
