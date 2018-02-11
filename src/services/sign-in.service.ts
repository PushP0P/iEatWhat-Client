import * as fb from 'firebase';
import { StoreService } from './store.service';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
declare var window: any;
// import history from './../router/router.history';
const store = new StoreService();

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
	store.setStore('user', {...result.user});
	store.setStore('tokens', {...result.credential});
}

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
	store.setStore('user', {...result.user});
	store.setStore('tokens', {...result.credential});
}

export async function onEmailSignIn(email: string, password: string): Promise<void> {
	const result = await fb.auth()
		.signInWithEmailAndPassword(email, password)
		.catch((err: any) => {
			console.log('Error Finding User with Email:', err);
			return fb.auth().createUserWithEmailAndPassword(email, password)
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
