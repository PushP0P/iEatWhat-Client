import { Action } from '../../models/action.model';
import { USDAItem } from '../../models/usda-food.model';
import { USDAReport } from '../../models/usda.model';

// tslint:disable
export function actionSelectItem(item: USDAItem | USDAReport): Action {
	return { type:'SEARCH_ITEM_SELECTED', payload: item}
}

export function actionExpandNavigation(): Action {
	return {type:'NAVIGATION_BAR_EXPANDED', payload: true}
}

export function actionCLoseNavigation(): Action {
	return {type:'NAVIGATION_BAR_CLOSED', payload: false}
}

export function actionShowResults(searchResults: USDAItem[]): Action {
	console.log('search', searchResults);
	return {
		type:'SEARCH_RESULTS_SHOWN',
		payload: {
			searchResultsVisible: true,
			searchResults: searchResults
		}
	}
}

export function actionHideResults(searchResults: USDAItem[]): Action {
	return {
		type:'SEARCH_RESULTS_HIDDEN',
		payload: {
			searchResultsVisible: true,
			searchResults: searchResults
		}
	}
}
