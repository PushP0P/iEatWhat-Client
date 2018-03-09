import { StoreService } from '../../services/store.service';
import { RouteComponentProps } from 'react-router';
import { Action } from '../store/action.model';
import { Subject } from '@reactivex/rxjs';
import { FoodProduct } from '../food.model';

export type SearchBarProps = {
	handleInputChange: Subject<string>;
	handleEnterPress: Subject<string>;
};

export type SearchComponentState = {
	searchItemsPerPage: number;
	nowSearching: boolean;
	resultsPage: number;
	resultsVisible: boolean;
};

export type SearchComponentProps = {
	store: StoreService;
	routes: RouteComponentProps<HTMLDivElement>;
};

export type SearchResultProps = {
	foodProduct: FoodProduct;
	clickHandler: (slug: string) => void;
};

export type SearchResultsProps = {
	products: FoodProduct[];
	dispatch: (action: Action) => void;
	selectHandler: (slug: string) => {};
	visible: boolean;
	pageNumber: number;
};

export const SEARCH_STATE_INIT: SearchComponentState = {
	searchItemsPerPage: 0,
	resultsPage: 20,
	nowSearching: false,
	resultsVisible: false
};
