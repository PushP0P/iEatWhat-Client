import { StoreService } from '../../services/store.service';
import { USDAItem } from '../usda/usda-food.model';
import { RouteComponentProps } from 'react-router';

export interface LandingComponentProps {
	store: StoreService;
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
