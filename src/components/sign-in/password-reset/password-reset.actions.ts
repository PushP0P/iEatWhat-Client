import { Action } from '../../../models/action.model';

export function toggleModalVisibilityOn(): Action {
	return {
		type: 'MODAL_VISIBILITY_ON',
	};
}

export function toggleModalVisibilityOff(): Action {
	return {
		type: 'MODAL_VISIBILITY_OFF',
	};
}
