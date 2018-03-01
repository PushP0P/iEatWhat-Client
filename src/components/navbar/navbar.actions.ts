import { Action } from '../../models/store/action.model';

export function enabledDropDown(): Action {
	return {
		type: 'ENABLE_DROP_DOWN',
		payload: {isExtended: true}
	}
}

export function disabledDropDown(): Action {
	return {
		type: 'DISABLE_DROP_DOWN',
		payload: {isExtended: false}
	}
}

export function loggedIn(): Action {
	return {
		type: 'IS_LOGGED_IN',
		payload: {isLoggedIn: true}
	}
}

export function loggedOut(): Action {
	return {
		type: 'IS_LOGGED_OUT',
		payload: {isLoggedIn: false}
	}
}
