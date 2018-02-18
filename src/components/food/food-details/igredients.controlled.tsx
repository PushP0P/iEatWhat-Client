import * as React from 'react';
import { ReactElement } from 'react';
import { USDANutrient } from '../../../models/usda/usda-report.model';

interface IngredientsComponentProps {
	ingredients: USDANutrient[];
}

export const IngredientsComponent = (props: IngredientsComponentProps): ReactElement<HTMLDivElement> => {
	return(
		<div
			className="ingredients-component"
		>
			<h2>Ingredients</h2>
			<ul>
				{props.ingredients.map((ingredient: USDANutrient) => {
					return(
						<li
							key={ingredient.nutrient_number}
						>
							{ingredient.nutrient_name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
