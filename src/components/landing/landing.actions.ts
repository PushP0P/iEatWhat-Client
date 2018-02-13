import { Action } from '../../models/action.model';
import { FoodItem } from '../../models/food.model';

// tslint:disable
export function actionSelectItem(item: FoodItem): Action {
	return { type:'SEARCH_ITEM_SELECTED', payload: item}
}

export function actionExpandNavigation(): Action {
	return {type:'NAVIGATION_BAR_EXPANDED', payload: true}
}

export function actionCLoseNavigation(): Action {
	return {type:'NAVIGATION_BAR_CLOSED', payload: false}
}

export function actionShowResults(searchResults: Set<FoodItem>): Action {
	return {type:'SEARCH_RESULTS_SHOWN', payload: searchResults}
}

export function actionHideResults(searchResults: Set<FoodItem>): Action {
	return {type:'SEARCH_RESULTS_HIDDEN', payload: searchResults}
}
