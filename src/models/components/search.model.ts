import { StoreService } from '../../services/store.service';
import { RouteComponentProps } from 'react-router';
import { Action } from '../store/action.model';
import { Subject } from '@reactivex/rxjs';
import { FoodProduct } from '../food.model';
import { LocationService } from '../../services/location.service';
import { LocationInfo } from '../location.model';

export type SearchBarProps = {
	handleInputChange: Subject<string>;
	handleEnterPress: (evt: Event) => any;
};

export type SearchComponentState = {
	searchItemsPerPage: number;
	nowSearching: boolean;
	resultsPage: number;
	resultsVisible: boolean;
	currentLocation: LocationInfo;
};

export type SearchComponentProps = {
	store: StoreService;
	location: LocationService;
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
	location: LocationInfo;
};

export const SEARCH_STATE_INIT: SearchComponentState = {
	searchItemsPerPage: 0,
	resultsPage: 20,
	nowSearching: false,
	resultsVisible: false,
	currentLocation: <LocationInfo> {},
};
