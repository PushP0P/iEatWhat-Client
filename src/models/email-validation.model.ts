export interface EmailValidationProps {
	history: {[props: string]: any};
	match: {[props: string]: any};
	location: {[props: string]: any};
}

export interface EmailValidationState {
	code: string;
	dataReady: boolean;
	lastDomain: string;
}

export const EMAIL_VALIDATION_STATE_INIT  = {
	dataReady: false,
	code: '0/0',
	lastDomain: 'unknown'
};
