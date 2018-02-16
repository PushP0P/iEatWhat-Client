import { StoreService } from '../services/store.service';
import { USDAItem } from './usda-food.model';

export interface LandingComponentProps {
	store: StoreService;
}

export interface LandingComponentState {
	dataReady: boolean;
	searchResultsVisible: boolean;
	searchValue: string;
	navbarExpanded: boolean;
	selectedItem: USDAItem;
	searchResults: USDAItem[];
}

export const LANDING_STATE_INIT: LandingComponentState = {
	searchResults: [],
	searchValue: '',
	searchResultsVisible: false,
	navbarExpanded: false,
	selectedItem: <USDAItem> {},
	dataReady: false
};
