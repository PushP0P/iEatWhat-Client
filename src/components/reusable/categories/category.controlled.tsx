import * as React from 'react';
import { ReactElement } from 'react';
import { SVGS } from '../../../assets/react-svgs.asset';
import { CategoryProps } from '../../../models/components/category.model';

export const CategoryBadgeComponent = (props: CategoryProps): ReactElement<HTMLDivElement> => {
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
					{SVGS[props.icon] || SVGS.iEatFork}
				</div>
			</div>
			<label
				className="sr-only"
			>
				{props.description}
			</label>
		</div>
	);
};
