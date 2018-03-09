import * as React from 'react';
import * as moment from 'moment';
import { ReactElement } from 'react';
import { FoodProduct } from '../../../models/food.model';
import { SearchResultsProps } from '../../../models/components/search.model';
import { SearchResultProps } from '../../../models/components/search.model';
import { CategoryProps } from '../../../models/components/category.model';
import { CategoryBadgeComponent } from '../categories/category.controlled';
import { Link } from 'react-router-dom';

export const SearchResult = (props: SearchResultProps): ReactElement<HTMLElement> => {
	const FIXTURE_IMG = 'https://static.pexels.com/photos/8758/food-dinner-lemon-rice.jpg';
	return (
		<Link
			className="search-result row"
			to={`/food-details/${props.foodProduct.ndbno}`}
		>
			<div
				className="result_image-box col-sm-4"
			>
				<div
					className="result_image"
				>
					<img src={props.foodProduct.imageURL || FIXTURE_IMG} alt={`A picture of ${props.foodProduct.name}`}/>
				</div>
			</div>
			<div
				className="result_info col-sm-8"
			>
				<div
					className="result_highlights"
				>
					{/*// prod name*/}
					<div>
						{props.foodProduct.name || 'No Name Found'}
					</div>
					{/*updated last*/}
					<div>
						{moment(Date.now()).fromNow()}
					</div>
					{/*reviewed*/}
					<div>
						{`No Reviews`}
					</div>
				</div>
				<div
					className="result_categories"
				>
					{props.foodProduct.categories.map(
						(category: CategoryProps) => {
							return (
								<CategoryBadgeComponent
									key={category.id.toString()}
									{...category}
								/>
							);
						})
					})}
				</div>
			</div>
		</Link>
	);
};

export const SearchResultsComponent = (props: SearchResultsProps) => {
	const display = props.visible ? 'flex' : 'none';
	return (
		<div
			style={{
				display: display
			}}
			className="search-results-component"
		>
			{props.products.map((product: FoodProduct) => {
				return (
					<SearchResult
						key={product.ndbno.toString()}
						foodProduct={product}
						clickHandler={props.selectHandler}
					/>
				);
			})}
		</div>
	);
};
