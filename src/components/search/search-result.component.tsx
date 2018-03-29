import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { SearchResultProps } from '../../models/components/search.model';
import { ReactElement } from 'react';
import { CategoryBadgeComponent } from '../reusable/categories/category.controlled';

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
					<img src={props.foodProduct.photo || FIXTURE_IMG} alt={`A picture of ${props.foodProduct.foodName}`}/>
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
							props.foodProduct.foodName
						|| 'No Name Found'}
					</div>
					{/*updated last*/}
					<div>
						{moment(props.foodProduct.updatedAt).format('ll')}
					</div>
					{/*reviewed*/}
				</div>
				<div
					className="result_body"
				>
					<div
						className="body_text"
					>
						{props.foodProduct.brandName
						|| `No Description`}
					</div>
				</div>
				<div
					className="result_categories"
				>
					{props.foodProduct.categories.map(
						(category: string) => {
							return (
								<CategoryBadgeComponent
									key={category}
									category={category}
								/>
							);
						})
					})}
				</div>
			</div>
		</Link>
	);
};
