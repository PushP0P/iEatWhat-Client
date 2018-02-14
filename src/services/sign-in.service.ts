import * as fb from 'firebase';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { FIREBASE_CONFIG } from '../configs/firebase.config';
import { BehaviorSubject, Observable } from '@reactivex/rxjs';
declare var window: any;
// import history from './../router/router.history';

firebase.initializeApp(FIREBASE_CONFIG);

const userAuthStateSource: BehaviorSubject<firebase.User>
	= new BehaviorSubject<firebase.User>(
		<firebase.User> fb.auth().currentUser
);
export const currentUser: Observable<firebase.User>
	= userAuthStateSource.asObservable();

firebase.auth()
	.onAuthStateChanged(
		(user: firebase.User) => {
			user
				? userAuthStateSource.next(user)
				: userAuthStateSource.next( <firebase.User> {});
	});

export function onGoogleSignIn(): void {
	const provider = new fb.auth.GoogleAuthProvider();
	signInWithRedirect(provider);
}

export function onTwitterSignIn(): void {
	const provider = new fb.auth.TwitterAuthProvider();
	signInWithRedirect(provider);
}

export async function signInWithPopup(provider: AuthProvider): Promise<void> {
	const result = await fb.auth().signInWithPopup(provider);
	if (!result) {
		return Promise.reject('Error with SignIn');
	}
	console.log('signed in with popup', result);
}

/**
 * Sign in with redirect sends user to another page for permission grants and is more mobile friendly.
 * @param {firebase.auth.AuthProvider} provider
 * @returns {Promise<void>}
 */
export async function signInWithRedirect(provider: AuthProvider): Promise<void> {
	const user = fb.auth().currentUser;
	if (user) {
		console.log('Link User', user);
		await user.linkWithRedirect(provider);
		return;
	}
	const result = await fb.auth().signInWithRedirect(provider);
	if (!result) {
		return Promise.reject('Error with SignIn');
	}
	console.log('Signed in with redirect', result);
}

export async function onEmailSignIn(email: string, password: string): Promise<void> {
	// Try and sign in user with email and password.
	const result = await fb.auth()
		.signInWithEmailAndPassword(email, password)
		// on fail will try and create new account with provided credentials
		.catch(async (err: any) => {
			// TODO create SignUp
			console.log('Error Finding User with Email:', err);
			const resposne = await fb.auth().createUserWithEmailAndPassword(email, password);
			if (!resposne) {
				return Promise.reject('Error: Email SignUp' + resposne);
			}
			return await resposne.sendEmailVerification()
				.catch((error: any) => alert('Error Signing Up, please try again. \n' + error));
		});
	console.log('result e/p', result);
}

export async function onPhoneSignIn(phoneNumber: string): Promise<void> {
	const phone = transformAndVerifyPhoneNumber(phoneNumber);
	if (!phone) {
		return alert('Please provide a US phone phoneNumber.');
	}
	await initializeReCAPTCHA();
	const provider = new fb.auth.PhoneAuthProvider();
	await provider.verifyPhoneNumber(phone, window.reCAPTCHA)
		.then(captchaVerified)
		.then((credential: any) => {
			console.log('phone cred', credential);
			return fb.auth().signInWithCredential(credential);
		})
		.catch((err: any) => {
			window.reCAPTCHA.reset(window.recaptchaWidgetId);
			console.log('Verify with phone error', err);
		});
}

export async function initializeReCAPTCHA(): Promise<void> {
	window.reCAPTCHA = new fb.auth.RecaptchaVerifier('ReCAPTCHA', {
		size: 'invisible',
	});
	await window.reCAPTCHA.render()
		.then((widgetId: any) => {
			window.recaptchaWidgetId = widgetId;
		});
}

export function captchaVerified(verificationId: any): any {
	const verificationCode = window.prompt('Please provide verification code that was sent to your device.');
	return fb.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
}

export function handleSignedInUser(user: any): void {

	console.log('User Signed In', user);
	// history.push('/dashboard');
}

export function handleSignedOutUser(): void {
	console.log('User Signed Out');
	// history.push('/');
}

export function handleEmailVerification(code: string): boolean {
	return true;
}

export function resetPasswordHandler(email: string): void {
	fb.auth().sendPasswordResetEmail(email);
}

function transformAndVerifyPhoneNumber(phoneNumber: string): string | null {
	// Trim spaces and remove any '-'s
	const noSpaces: string = phoneNumber.trim().replace(/[-]/g, '');
	// Ensure US prefixed number
	const prefix: string = `${noSpaces.slice(0, 1) === '+1'
		? noSpaces
		: noSpaces[0] === '1'
			? `+${noSpaces}`
			: `+1${noSpaces}`}`;
	return prefix.length === 12 ? prefix : null;
}
