import * as React from 'react';
import { ReactElement } from 'react';
import { SearchResultsProps } from '../../../models/search.model';
import { SearchResultProps } from '../../../models/search.model';
import { CategoryComponent } from '../categories/category.controlled';
import * as moment from 'moment';
import { FoodItem } from '../../../models/food.model';

export const SearchResult = (props: SearchResultProps): ReactElement<HTMLElement> => {
	const FIXTURE_IMG = 'https://static.pexels.com/photos/8758/food-dinner-lemon-rice.jpg';

	return (
		<div
			className="search-result row"
		>
			<div
				className="result_image col-sm-4"
			>
				<img src={props.item.imageURL || FIXTURE_IMG} alt={`A picture of ${props.item.name}`}/>
			</div>
			<div
				className="result_info col-sm-8"
			>
				<div
					className="result_highlights"
				>
					{/*// prod name*/}
					<div>
						{props.item.name || 'No Name Found'}
					</div>
					{/*updated last*/}
					<div>
						{props.item.lastUpdated || moment (Date.now ()).fromNow ()}
					</div>
					{/*reviewed*/}
					<div>
						{props.item.reviewed ? `Reviewed ${props.item.reviews}` : `No Reviews`}
					</div>

				</div>
				<div
					className="result_categories"
				>
					{['demo'].map((tag: string) => {
						return (
							<CategoryComponent
								key={tag}
								tag={tag}
							/>
						);
					})}
				</div>
			</div>
		</div>
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
			{props.items.map ((item: FoodItem) => {
				return (
					<SearchResult
						key={item.ndbno.toString ()}
						item={item}
						clickHandler={() => {
							props.selectHandler (item.ndbno);
						}}
					/>
				);
			})}
		</div>
	);
};
