import * as React from 'react';
import { ReactElement } from 'react';
import { USDAItem } from '../../models/usda-food.model';

interface SearchResultProps {
	item: USDAItem;
}

export const SearchResult = (props: SearchResultProps): ReactElement<HTMLElement> => {
	return (
		<div
			className="search-result"
		>
			<h1>I am a search result</h1>
		</div>
	);
};
