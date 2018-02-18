// tslint:disable

import { Action } from '../../../models/store/action.model';

export function actionShowResults(): Action {
	return {
		type:'SEARCH_RESULTS_SHOWN',
		payload: {
			resultsVisible: true,
		}
	}
}

export function actionHideResults(): Action {
	return {
		type:'SEARCH_RESULTS_HIDDEN',
		payload: {
			resultsVisible: true,
		}
	}
 }

 export function actionNextPage(): Action {
	return {
		type:'SEARCH_RESULTS_NEXT_PAGE'
	}
 }
export function actionPrevPage(): Action {
	return {
		type:'SEARCH_RESULTS_PREV_PAGE'
	}
 }
export function actionToPage(pageIndex: number): Action {
	return {
		type:'SEARCH_RESULTS_TO_PAGE',
		payload: pageIndex
	}
 }
