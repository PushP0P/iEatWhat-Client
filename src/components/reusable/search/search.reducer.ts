import { Action } from '../../../models/store/action.model';
import { SearchComponentState } from '../../../models/components/search.model';

export const searchReducer = function(action: Action, currentState: SearchComponentState): SearchComponentState {
	const { type, payload} = action;

	switch (type) {
		case'DATA_LOADED':
			return {...currentState, ...payload};
		case'DATA_LOADING':
			return {...currentState, ...payload};
		case'NO_DATA':
			return {...currentState, ...payload};
		case'SEARCH_RESULTS_SHOWN':
			return {...currentState, ...payload};
		case'SEARCH_RESULTS_HIDDEN':
			return {...currentState, ...payload};
		case'SEARCHING':
			return {...currentState, ...payload};
		case'SEARCH_DONE':
			return {...currentState, ...payload};
		default:
			return currentState;
	}
};
