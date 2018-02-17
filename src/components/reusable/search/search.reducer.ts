import { Action } from '../../../models/store/action.model';
import { SearchComponentState } from '../../../models/search.model';

export const searchReducer = function(action: Action, currentState: SearchComponentState): SearchComponentState {
	const { type, payload} = action;
	switch (type) {
		case'DATA_LOADED':
			return {...currentState, ...action.payload};
		case'DATA_LOADING':
			return {...currentState, ...action.payload};
		case'NO_DATA':
			return {...currentState, ...action.payload};
		case'SEARCH_RESULTS_SHOWN':
			return {...currentState, ...payload};
		case'SEARCH_RESULTS_HIDDEN':
			return {...currentState, resultsVisible: false};
		default:
			return currentState;
	}
};
