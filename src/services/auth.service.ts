import * as fb from 'firebase';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { FIREBASE_CONFIG } from '../configs/firebase.config';
import { BehaviorSubject, Observable } from '@reactivex/rxjs';


export class UserAuthServices {
	private userAuthStateSource: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User> (<firebase.User> fb.auth ().currentUser);
	public currentUser: Observable<firebase.User> = this.userAuthStateSource.asObservable ();

	constructor() {
		firebase.initializeApp(FIREBASE_CONFIG);
		firebase.auth()
			.onAuthStateChanged((user: firebase.User) => {
				user
					? this.userAuthStateSource.next (user)
					: this.userAuthStateSource.next (<firebase.User> {});
			});
	}

	public async onGoogleSignIn(): Promise<void> {
		const provider = new fb.auth.GoogleAuthProvider ();
		await this.signInWithRedirect(provider);
	}

	public async onTwitterSignIn(): Promise<void> {
		const provider = new fb.auth.TwitterAuthProvider ();
		await this.signInWithRedirect(provider);
	}

	public async signInWithPopup(provider: AuthProvider): Promise<void> {
		const result = await fb.auth ().signInWithPopup (provider);
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
	public async signInWithRedirect(provider: AuthProvider): Promise<void> {
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

	public async onLocalSignIn(email: string, password: string): Promise<void> {
		// Try and sign in user with email and password.
		const result = await fb.auth()
			.signInWithEmailAndPassword (email, password)
			// on fail will try and create new account with provided credentials
			.catch (async (err: any) => {
				// TODO create SignUp
				console.log ('Error Finding User with Email:', err);
			});
		console.log ('result e/p', result);
	}

	public async onLocalSignUp(email: string, password: string): Promise<void> {
		const response = await fb.auth()
			.createUserWithEmailAndPassword (email, password);
		if (!response) {
			return Promise.reject ('Error: Email SignUp' + response);
		}
		return await response.sendEmailVerification()
			.catch((error: any) => alert ('Error Signing Up, please try again. \n' + error));

	}

	public handleEmailVerification(code: string): boolean {

		return true;
	}

	public async resetPasswordHandler(email: string): Promise<void> {
		await fb.auth().sendPasswordResetEmail(email);
	}

}
