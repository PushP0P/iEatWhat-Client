import { Action } from '../../models/store/action.model';

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

export function enabledDropDown(): Action {
	return {
		type: 'ENABLE_DROP_DOWN',
		payload: {navbarIsExtended: true}
	};
}

export function disabledDropDown(): Action {
	return {
		type: 'DISABLE_DROP_DOWN',
		payload: {navbarIsExtended: false}
	};
}

export function loggedIn(): Action {
	return {
		type: 'IS_LOGGED_IN',
		payload: {isLoggedIn: true}
	};
}

export function loggedOut(): Action {
	return {
		type: 'IS_LOGGED_OUT',
		payload: {isLoggedIn: false}
	};
}
