import * as React from 'react';
import { ReactElement } from 'react';
import { SearchResultsProps } from '../../../models/search.model';
import { SearchResultProps } from '../../../models/search.model';

export const SearchResult = (props: SearchResultProps): ReactElement<HTMLElement> => {
	return (
		<div
			className="search-result"
		>
			<h4>{props.item.name}</h4>
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
			{props.items.map((item => {
				return (
					<SearchResult
						key={item.ndbno.toString()}
						item={item}
						clickHandler={() => {
							props.selectHandler(item.ndbno);
						}}
					/>
				);
			}))}
		</div>
	);
};
