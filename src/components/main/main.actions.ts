import { Action } from '../../models/action.model';

export function actionDataReady(): Action {
	return {
		type: 'DATA_LOADED',
		payload: {
			dataReady: true
		}
	};
}

export function actionDataBusy(): Action {
	return {
		type: 'DATA_LOADING',
		payload: {
			dataReady: false
		}
	};
}

export function actionDataError(): Action {
	return {
		type: 'NO_DATA',
		payload: {
			loadingError: true
		}
	};
}
