import { NavbarState } from '../../models/components/navbar.model';
import { Action } from '../../models/store/action.model';

export function navbarReducer(action: Action, state: NavbarState): NavbarState {
	const {type, payload} = action;
	switch (type) {
		case'ENABLE_DROP_DOWN':
			return {...state, ...payload};
		case'DISABLE_DROP_DOWN':
			return {...state, ...payload};
		case'IS_LOGGED_IN':
			return {...state, ...payload};
		case'IS_LOGGED_OUT':
			return {...state, ...payload};
		default:
			return state;
	}
}
