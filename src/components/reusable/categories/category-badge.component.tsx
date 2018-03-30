import * as React from 'react';
import { ReactElement } from 'react';

export const CategoryBadgeComponent = (props: {category: string}): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="category-component"

		>
				<div
					className="category_icon"
				>
					<div
						className="icon_wrapper"
					>
						{props.category}
					</div>
				</div>
			<label
				className="sr-only"
			>
				{props.category}
			</label>
		</div>
	);
};
