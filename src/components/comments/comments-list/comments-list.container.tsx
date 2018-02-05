import * as React from 'react';
import { ReactElement } from 'react';
import {
	COMMENTS_LIST_STATE_INIT,
	CommentsList, CommentsListProps, CommentsListState,
} from '../../../models/comments.model';
import { CommentComponent } from '../comment.controlled';
import { getComments } from '../../../services/comments.service';

export class CommentsListContainer extends React.Component<CommentsListProps, CommentsListState> {

	constructor(public props: CommentsListProps) {
		super(props);
		this.state = COMMENTS_LIST_STATE_INIT;
	}

	public async componentDidMount(): Promise<void> {
		const comments: CommentsList = await getComments(this.props.containerId);
		this.setState({
			comments: {
				...comments
			},
			dataReady: true
		});
	}

	public render(): ReactElement<HTMLDivElement> {
		return(
			<div
				className="comments-list"
			>
				{this.renderComments()}
			</div>
		);
	}

	private renderComments(): ReactElement<HTMLDivElement> | ReactElement<HTMLDivElement>[] {
		if (this.state.dataReady) {
			const commentKeys: string[] = Object.keys(this.state.comments);

			return commentKeys.map((key: string) => {
				if (this.state.comments[key].replies) {
					return (
						<div
							className="comment-with-replies"
						>
							<CommentComponent
								key={key}
								{...this.state.comments[key]}
							/>
							<div
								className="replies"
							>
								<div>
									<CommentsListContainer
										topic={this.props.topic}
										containerId={key}
									/>
								</div>
							</div>
						</div>
					);
				}
				return (
					<CommentComponent
						key={key}
						{...this.state.comments[key]}
					/>
				);
			});
		} else {
			return(
				<div>
				List Loading ......
				</div>
			);
		}
	}
}
