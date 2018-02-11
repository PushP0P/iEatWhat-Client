import { Action } from '../../../models/action.model';

export function toggleVisibilityOn(): Action {
	return {
		type: 'TOGGLE_VISIBILITY_ON',
	};
}

export function toggleVisibilityOff(): Action {
	return {
		type: 'TOGGLE_VISIBILITY_OFF',
	};
}
