import { Action } from '../../models/store/action.model';
import { SearchComponentState } from '../../models/components/search.model';
import { SelectedCategories } from '../../models/components/category-select.model';

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
		case'SEARCH_INIT_CATEGORIES':
			let selectedCategories = {};
			for (let category of payload) {
				selectedCategories = {
					...selectedCategories,
					[category]: false
				};
			}
			return {
				...currentState,
				categories: payload,
				selectedCategories: selectedCategories,
			};
		case'SEARCH_TOGGLE_CATEGORY':
			const currentSelected: SelectedCategories = currentState.selectedCategories;
			const nextSelected: SelectedCategories = {
				...currentSelected,
				[payload]: !currentSelected[payload]
			};
			return {
				...currentState,
				selectedCategories: nextSelected
			};
		default:
			return currentState;
	}
};
