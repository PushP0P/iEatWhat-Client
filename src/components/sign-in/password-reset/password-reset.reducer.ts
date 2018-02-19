import { Action } from '../../../models/store/action.model';
import { ResetPasswordComponentState } from '../../../models/components/password-reset.model';

export function passwordResetReducer(
	action: Action,
	currentState: ResetPasswordComponentState
): ResetPasswordComponentState {
	const {type} = action;

	switch (type) {
		case'MODAL_VISIBILITY_ON':
			return {...currentState, showModal: true};
		case'MODAL_VISIBILITY_OFF':
			return {...currentState, showModal: false};
		default:
			return currentState;
	}
}
