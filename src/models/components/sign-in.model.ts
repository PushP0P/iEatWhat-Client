/**
 *  END FIXTURES
 */

export interface SignInOption {
	id: string;
	title: string;
	icon: string;
	handler: () => any;
}

export interface SignInOptionsProps {
	signInOptions: SignInOption[];
}

export interface SignInComponentProps {

}

export interface SignInComponentState {
	signInOptions: SignInOption[];
}

export const SIGN_IN_OPTIONS_INITIALE_STATE: SignInComponentState = {
	signInOptions: []
};
