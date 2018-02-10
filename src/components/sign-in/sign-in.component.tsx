import * as React from 'react';
import {
	SignInComponentProps, SignInComponentState
} from '../../models/sign-in.model';
import {
	onEmailSignIn, onPhoneSignIn
} from '../../services/sign-in.service';
import { PhoneSignInForm } from './forms/phone.form';
import { EmailSignInForm } from './forms/email.form';
import { SignInOptions } from './sign-in-options.controlled';
import { SignInFooter } from './sign-in.footer';
import { SIGN_IN_OPTIONS } from '../../configs/sign-in.config';

export class SignInComponent extends React.Component<SignInComponentProps, SignInComponentState> {
	public render() {
		return(
			<div
				className="sign-in-component container text-center"
			>
				<div
					className="content"
				>
					<p>Please, sign up or In with the following options.</p>
					<PhoneSignInForm
						onSubmit={onPhoneSignIn}
					/>
					<EmailSignInForm
						onSubmit={onEmailSignIn}
					/>
					<SignInOptions
						signInOptions={SIGN_IN_OPTIONS}
					/>
					<SignInFooter />
					<div
						id="ReCAPTCHA"
					/>
				</div>
			</div>
		);
	}
}
