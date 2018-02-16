import * as React from 'react';
import { ReactElement } from 'react';
import { USDAItem } from '../../models/usda-food.model';

interface SearchResultProps {
	item: USDAItem;
}
interface SearchResultsProps {
	searchResults: USDAItem[];
	itemSelectHandler: (ndbno: string) => {};
	visible: boolean;
}

export const SearchResultsComponent = (props: SearchResultsProps) => {
	const display = props.visible ? 'flex' : 'none';
	const results: USDAItem[] = !props.searchResults ? [] : props.searchResults;
	return (
		<div
			style={{
				display: display
			}}
			className="search-results-component"
		>
			{results.map(item => {
				return (
					<div
						key={item.ndbno.toString()}
						className="search-item"
						onClick={() => {
							props.itemSelectHandler(item.ndbno);
						}}
					/>
				);
			})}
		</div>
	);
};

export const SearchResult = (props: SearchResultProps): ReactElement<HTMLElement> => {
	return (
		<div
			className="search-result"
		>
			<h1>I am a search result</h1>
		</div>
	);
};
