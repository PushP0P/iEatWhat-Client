declare var window: any;
import * as fb from 'firebase';

export function onGoogleSignIn(): void {
	const provider = new fb.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	signInWithPopup(provider);
}

export function onTwitterSignIn(): void {
	const provider = new fb.auth.TwitterAuthProvider();
	signInWithPopup(provider);
}

export function signInWithPopup(provider: any): void {
	fb.auth().signInWithPopup(provider).then((res: any) => {
		// Handle Token Store
		console.log('signed in', res);
		console.log('User', res.user);
		console.log('Token', res.credential.accessToken);
	});
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
}

export function handleSignedOutUser(): void {
	console.log('USer Signed Out');
}

export function transformAndVerifyPhoneNumber(phoneNumber: string): string | null {
	// Trim spaces and remove any '-'
	const noSpaces: string = phoneNumber.trim().replace(/[-]/g, '');

	// Ensure US prefixed number
	const prefix: string = `${noSpaces.slice(0, 1) === '+1'
		? noSpaces
		: noSpaces[0] === '1'
			? `+${noSpaces}`
			: `+1${noSpaces}`}`;
	console.log(prefix);
	return prefix.length === 12 ? prefix : null;
}
