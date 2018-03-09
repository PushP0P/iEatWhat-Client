import * as React from 'react';
import { ReactElement } from 'react';
import { ReviewProps } from '../../../models/components/review.model';
import * as moment from 'moment';
import { Stars } from '../../reusable/stars/stars.component';

export const Review = (props: ReviewProps): ReactElement<HTMLDivElement> => {
	return (
		<div
			className="review-component"
		>
			<div
				className="review-header"
			>
				<div
					className="author"
				>
					{props.authorName}
				</div>
				<div
					className="date--created"
				>
					{moment(props.createdOn).format('LL')}
				</div>
				<div
					className="stars"
				>
					<Stars
						fullStars={props.stars}
					/>
				</div>
			</div>
			<div
				className="content"
				contentEditable={props.editMode}
				suppressContentEditableWarning={true}
			/>
			{props.editable
				? (
					<div
						className="tool-bar"
					>
						<div
							className="review_save-edit-button"
						>
							Edit
						</div>
						<div
							className="review_remove-cancel-button"
						>
							Remove
						</div>
					</div>
				) :
					''
			}
		</div>
	);
};
