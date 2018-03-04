import * as fb from 'firebase';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from '@reactivex/rxjs';
import AuthProvider = firebase.auth.AuthProvider;
import { FirebaseUser } from '../models/auth/firebases-user';

// tslint:disable

export class AuthServices {
	public currentUserSource: BehaviorSubject<FirebaseUser>
		= new BehaviorSubject<FirebaseUser> (<FirebaseUser>{});
	public currentUser: Observable<FirebaseUser> = this.currentUserSource.asObservable();

	constructor() {
		firebase.auth()
			.onAuthStateChanged ((user: FirebaseUser) => {
				console.log('state change', user);
				this.currentUserSource.next (user)
			});
	}
}

export async function onGoogleSignIn(): Promise<void> {
	const provider = new fb.auth.GoogleAuthProvider ();
	await signInWithRedirect(provider);
}

export async function onTwitterSignIn(): Promise<void> {
	const provider = new fb.auth.TwitterAuthProvider ();
	await signInWithRedirect(provider);
}

export async function signInWithPopup(provider: AuthProvider): Promise<void> {
	const result = await fb.auth()
		.signInWithPopup (provider);
	if (!result) {
		return Promise.reject ('Error with SignIn');
	}
	console.log ('signed in with popup', result);
}

/**
 * Sign in with redirect sends user to another page for permission grants
 * and is more mobile friendly.
 * @param {firebase.auth.AuthProvider} provider
 * @returns {Promise<void>}
 */
export async function signInWithRedirect(provider: AuthProvider): Promise<void> {
	const user = fb.auth ().currentUser;
	if (user) {
		console.log ('Link User', user);
		await user.linkWithRedirect (provider);
		return;
	}
	const result = await fb.auth ().signInWithRedirect (provider);
	if (!result) {
		return Promise.reject ('Error with SignIn');
	}
	console.log ('Signed in with redirect', result);
}

export async function onLocalSignIn(email: string, password: string): Promise<void> {
	// Try and sign in user with email and password.
	const result = await fb.auth ()
		.signInWithEmailAndPassword (email, password)
		// on fail will try and create new account with provided credentials
		.catch (async (err: any) => {
			// TODO create SignUp
			console.log ('Error Finding User with Email:', err);
		});
	console.log ('result e/p', result);
}

export async function onLocalSignUp(email: string, password: string): Promise<void> {
	const response = await fb.auth ()
		.createUserWithEmailAndPassword (email, password);
	if (!response) {
		return Promise.reject ('Error: Email SignUp' + response);
	}
	return await response.sendEmailVerification ()
		.catch ((error: any) => alert ('Error Signing Up, please try again. \n' + error));

}
// tslint:disable
export function testIfEmail(testString: string): boolean {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(testString);
}

export function handleEmailVerification(code: string): boolean {

	return true;
}

export async function resetPasswordHandler(email: string): Promise<void> {
	await fb.auth ().sendPasswordResetEmail (email);
}

export async function logOut(): Promise<void> {
	await firebase.auth().signOut();
}
