// tslint:disable

import { Action } from '../../../models/store/action.model';

export function actionShowResults(): Action {
	return {
		type:'SEARCH_RESULTS_SHOWN',
		payload: {
<<<<<<< HEAD
			resultsVisible: true,
		}
	}
}

export function actionSearchDone(): Action {
	return {
		type:'SEARCH_DONE',
		payload: {
			nowSearching: false,
			resultsVisible: true,
		}
	}
}

export function actionSearching(): Action {
	return {
		type:'SEARCHING',
		payload: {
			nowSearching: true,
=======
			searchResultsVisible: true,
>>>>>>> d3a0ba6845dd46e58b9a2a03c4d7312fd9f3e43a
		}
	}
}

export function actionHideResults(): Action {
	return {
		type:'SEARCH_RESULTS_HIDDEN',
		payload: {
<<<<<<< HEAD
			resultsVisible: true,
=======
			searchResultsVisible: true,
>>>>>>> d3a0ba6845dd46e58b9a2a03c4d7312fd9f3e43a
		}
	}
 }

 export function actionNextPage(): Action {
	return {
		type:'SEARCH_RESULTS_NEXT_PAGE'
	}
 }
<<<<<<< HEAD

 export function actionPrevPage(): Action {
=======
export function actionPrevPage(): Action {
>>>>>>> d3a0ba6845dd46e58b9a2a03c4d7312fd9f3e43a
	return {
		type:'SEARCH_RESULTS_PREV_PAGE'
	}
 }
<<<<<<< HEAD

=======
>>>>>>> d3a0ba6845dd46e58b9a2a03c4d7312fd9f3e43a
export function actionToPage(pageIndex: number): Action {
	return {
		type:'SEARCH_RESULTS_TO_PAGE',
		payload: pageIndex
	}
 }
