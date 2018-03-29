import * as React from 'react';
import { CategoriesSelectProps } from '../../../models/components/category-select.model';

export const CategoriesSelect = (props: CategoriesSelectProps) => {

	return(
		<div
			className="categories-select"
		>
			<h2>
				Choose what to filter out
			</h2>
			<div
				className="categories_wrapper"
			>
				{props.categories.map((category: string) => {
					// let label = '';
					const selectedClass: string = props.selected[category] ? 'selected' : '';
					// const words = category.split(' ');
					// for (let word of words) {
					// 	label += word[0].toUpperCase();
					// }
					return (
						<div
							key={category}
							className={'category ' + selectedClass}
							onClick={() => {
								props.selectHandler(category);
							}}
						>
							{category}
						</div>
					);
				})}
			</div>
		</div>
	);
};
