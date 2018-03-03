import { onGoogleSignIn, onTwitterSignIn } from '../services/auth.service';
import { SignInOption } from '../models/components/sign-in.model';

export const SIGN_IN_OPTIONS: SignInOption[] = [
	{
		id: 'GoogleSignIn',
		title: 'Google',
		icon: 'google',
		handler: onGoogleSignIn
	},
	{
		id: 'TwitterSignIn',
		title: 'Twitter',
		icon: 'twitter',
		handler: onTwitterSignIn
	}
];
