import { StoreService } from '../services/store.service';
import { FoodItem } from './food.model';

export interface LandingComponentProps {
	store: StoreService;
}

export interface LandingComponentState {
	dataReady: boolean;
	searchResultsVisible: boolean;
	searchValue: string;
	navbarExpanded: boolean;
	selectedItem: FoodItem;
	searchResults: Set<FoodItem>;
}

export const LANDING_STATE_INIT = {
	searchResults: new Set<FoodItem>(),
	searchValue: '',
	searchResultsVisible: false,
	navbarExpanded: false,
	selectedItem: <FoodItem> {},
	dataReady: false
};
