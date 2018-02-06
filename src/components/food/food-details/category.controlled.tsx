import * as React from 'react';
import { ReactElement } from 'react';

interface CategoryComponentProps {
	tag: string;
}

export const CategoryComponent = (props: CategoryComponentProps): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="category-component"
		>
			<div
				className="category_icon"
			>
				ICON
			</div>
			<label>
				{props.tag}
			</label>
		</div>
	);
};
