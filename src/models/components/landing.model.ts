import { StoreService } from '../../services/store.service';
import { USDAItem } from '../usda/usda-food.model';
import { RouteComponentProps } from 'react-router';
import { LocationService } from '../../services/location.service';

export interface LandingComponentProps {
	store: StoreService;
	location: LocationService;
	routeProps: RouteComponentProps<HTMLDivElement>;
}

export interface LandingComponentState {
	dataReady: boolean;
	searchResultsVisible: boolean;
	searchValue: string;
	navbarExpanded: boolean;
	selectedItem: USDAItem;
	searchResults: USDAItem[];
	searchResultsPageNumber: number;
}

export const LANDING_STATE_INIT: LandingComponentState = {
	searchResults: [],
	searchResultsPageNumber: 0,
	searchValue: '',
	searchResultsVisible: false,
	navbarExpanded: false,
	selectedItem: <USDAItem> {},
	dataReady: false
};
