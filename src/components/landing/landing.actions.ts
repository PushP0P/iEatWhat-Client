import { Action } from '../../models/store/action.model';

// tslint:disable
export function actionExpandNavigation(): Action {
	return {type:'NAVIGATION_BAR_EXPANDED', payload: true}
}

export function actionCLoseNavigation(): Action {
	return {type:'NAVIGATION_BAR_CLOSED', payload: false}
}
