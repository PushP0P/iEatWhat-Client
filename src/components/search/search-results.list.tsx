import * as React from 'react';
import { FoodProduct } from '../../models/food.model';
import { SearchResultsProps } from '../../models/components/search.model';
import { SearchResult } from './search-result.component';

export const SearchResultsComponent = (props: SearchResultsProps) => {

	const display = props.visible ? 'flex' : 'none';

	return (
		<div
			style={{
				display: display
			}}
			className="search-results-component"
		>
			<div
				className="search-list_title"
			>
				{
					(!!props.location && !!props.location.current && !!props.location.current.city)
						? 'Food found near' + props.location.current.city
						:  'Food We Found'
				}
			</div>
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
