import { Action } from '../../models/store/action.model';
import { LandingComponentState } from '../../models/landing.model';

export const landingReducer = function(action: Action, currentState: LandingComponentState): LandingComponentState {
	const { type, payload} = action;
	switch (type) {
		case'DATA_LOADED':
			return {...currentState, ...payload};
		case'DATA_LOADING':
			return {...currentState, ...payload};
		case'NO_DATA':
			return {...currentState, ...payload};
		case'NAVIGATION_BAR_EXPANDED':
			return {...currentState, navbarExpanded: true};
		case'NAVIGATION_BAR_CLOSED':
			return {...currentState, navbarExpanded: false};
		default:
			return currentState;
	}
};
