import { Action } from '../../models/action.model';
import { LandingComponentState } from '../../models/landing.model';

export const landingReducer = function(action: Action, currentState: LandingComponentState): LandingComponentState {
	const { type, payload} = action;
	switch (type) {
		case'DATA_LOADED':
			return {...currentState, ...action.payload};
		case'DATA_LOADING':
			return {...currentState, ...action.payload};
		case'NO_DATA':
			return {...currentState, ...action.payload};
		case'SEARCH_ITEM_SELECTED':
			return {...currentState, selectedItem: payload};
		case'NAVIGATION_BAR_EXPANDED':
			return {...currentState, navbarExpanded: true};
		case'NAVIGATION_BAR_CLOSED':
			return {...currentState, navbarExpanded: false};
		case'SEARCH_RESULTS_SHOWN':
			return {...currentState, ...payload};
		case'SEARCH_RESULTS_HIDDEN':
			return {...currentState, searchResultsVisible: false, searchResults: payload};
		default:
			return currentState;
	}
};
