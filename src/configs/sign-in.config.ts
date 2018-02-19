import { onGoogleSignIn, onTwitterSignIn } from '../services/sign-in.service';
import { SignInOption } from '../models/components/sign-in.model';

export const SIGN_IN_OPTIONS: SignInOption[] = [
	{
		id: 'GoogleSignIn',
		title: 'Google Sign-In',
		link: '#',
		icon: 'google',
		handler: onGoogleSignIn
	},
	{
		id: 'TwitterSignIn',
		title: 'Twitter Sign-In',
		link: '#',
		icon: 'twitter',
		handler: onTwitterSignIn
	}
];
