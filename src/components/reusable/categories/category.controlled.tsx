import * as React from 'react';
import { ReactElement } from 'react';
import { Hoverable } from '../hoverable/hoverable.component';

export const CategoryBadgeComponent = (props: {category: string}): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="category-component"

		>
			<Hoverable
				label={props.category}
			>
				<div
					className="category_icon"
				>
					<div
						className="icon_wrapper"
					>
						{props.category
							.split(' ')
							.reduce(
								(acc, val) => {
									console.log(acc, val);
									if (val) {
										return acc += val[0].toUpperCase();
									}
									return acc;
								},
								''
							)
						}
					</div>
				</div>
			</Hoverable>
			<label
				className="sr-only"
			>
				{props.category}
			</label>
		</div>
	);
};
