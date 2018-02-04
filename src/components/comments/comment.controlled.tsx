import * as React from 'react';
import { CommentProps } from '../../models/comments.model';
import * as moment from 'moment';

export const CommentComponent = (props: CommentProps) => {
	return (
		<div
			className="comment-component"
		>
			<div
				className="comment_avatar"
			>
				Picture
			</div>

			<div
				className="comment_meta"
			>
				<div
					className="comment_name"
				>
					{props.userId}
				</div>
				<div
					className="comment_date"
				>
					{moment(props.create_date)}
				</div>
			</div>
		</div>
	);
};
