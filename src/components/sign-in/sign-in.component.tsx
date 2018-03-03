import * as React from 'react';
import {
	SignInComponentProps, SignInComponentState
} from '../../models/components/sign-in.model';
import {
	onLocalSignIn
} from '../../services/auth.service';
import { EmailSignInForm } from './forms/email.form';
import { SignInOptions } from './sign-in-options.controlled';
import { SIGN_IN_OPTIONS } from '../../configs/sign-in.config';
import { SVGS } from '../../assets/react-svgs.asset';

export class SignInComponent extends React.Component<SignInComponentProps, SignInComponentState> {
	public render() {
		return(
			<div
				className="sign-in-component text-center"
			>
				<div
					className="one-click_title header h1"
				>
					Log In
				</div>
				<SignInOptions
					signInOptions={SIGN_IN_OPTIONS}
				/>
				<div
					className="line-break_wrapper"
				>
					{SVGS.lineBreak}
				</div>
				<div
					className="sign-in_text--or header h3"
				>
					Or
				</div>
				<div
					className="sign-in_text--log-in header h1"
				>
					Log In
				</div>
				<EmailSignInForm
					onSubmit={onLocalSignIn}
				/>
			</div>
		);
	}
}
