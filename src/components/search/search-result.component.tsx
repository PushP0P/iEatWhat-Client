import * as React from 'react';
import * as moment from 'moment';
import { CategoryProps } from '../../models/components/category.model';
import { CategoryBadgeComponent } from '../reusable/categories/category.controlled';
import { Link } from 'react-router-dom';
import { SearchResultProps } from '../../models/components/search.model';
import { ReactElement } from 'react';

export const SearchResult = (props: SearchResultProps): ReactElement<HTMLElement> => {

	const FIXTURE_IMG = 'https://static.pexels.com/photos/8758/food-dinner-lemon-rice.jpg';
	return (
		<Link
			className="search-result row"
			to={`/food-details?ndbno=${props.foodProduct.ndbno}`}
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
					className="result_header"
				>
					{/*// prod name*/}
					<div>
						{
							props.foodProduct.name
						|| 'No Name Found'}
					</div>
					{/*updated last*/}
					<div>
						{moment(props.foodProduct.updatedOn).format('ll')}
					</div>
					{/*reviewed*/}
				</div>
				<div
					className="result_body"
				>
					<div
						className="body_text"
					>
						{props.foodProduct.shortDescription
						|| `No Description`}
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
