import { StoreService } from '../../services/store.service';
import { RouteComponentProps } from 'react-router';
import { Action } from '../store/action.model';
import { Subject } from '@reactivex/rxjs';
import { FoodProduct } from '../food.model';
import { LocationService } from '../../services/location.service';
import { LocationInfo } from '../location.model';
import { SelectedCategories } from './category-select.model';

export type SearchBarProps = {
	handleInputChange: Subject<string>;
	handleEnterPress: () => void;
	categories: string[];
	selectedCategories: SelectedCategories;
	categorySelectHandler: (category: string) => void;
};

export type SearchComponentState = {
	searchItemsPerPage: number;
	nowSearching: boolean;
	resultsPage: number;
	resultsVisible: boolean;
	currentLocation: LocationInfo;
	instantSearchResults: {id: string}[];
	categories: string[];
	selectedCategories: SelectedCategories;
};

export type SearchComponentProps = {
	store: StoreService;
	location: LocationService;
	routes: RouteComponentProps<HTMLDivElement>;
};

export type SearchResultProps = {
	foodProduct: FoodProduct;
	clickHandler: (slug: string) => any;
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
	instantSearchResults: [],
	searchItemsPerPage: 0,
	resultsPage: 20,
	nowSearching: false,
	resultsVisible: false,
	currentLocation: <LocationInfo> {},
	categories: [],
	selectedCategories: {}
};
