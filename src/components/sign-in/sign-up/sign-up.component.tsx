import * as React from 'react';
import { ReactElement } from 'react';
import { SyntheticEvent } from 'react';
import { onLocalSignUp } from '../../../services/auth.service';
import { SignUpProps } from '../../../models/components/sign-up.model';
import { SignUpState } from '../../../models/components/sign-up.model';
import { SIGN_UP_STATE_INIT } from '../../../models/components/sign-up.model';
import { loggedIn } from '../../main/main.actions';
import { testIfEmail } from '../../../services/auth.service';

export class SignUpComponent extends React.Component<SignUpProps, SignUpState> {
	public state: SignUpState = SIGN_UP_STATE_INIT;
	private email: string = '';
	private password: string = '';
	private again: string = '';

	public render(): ReactElement<HTMLDivElement> {
		return(
			<form
				className="sign-up-component"
			>
				<h1>Sign Up</h1>
				<div
					className="input-group"
				>
					<label
						className="sr-only"
					>
						please provide an email
					</label>
					<input
						type="email"
						placeholder="email"
						onChange={
							(evt: SyntheticEvent<HTMLInputElement>) => {
								this.email = (evt.target as any).value;
							}}
					/>
				</div>
				<div
					className="input-group"
				>
					<label
						className="sr-only"
					>
						please create a password
					</label>
					<input
						type="password"
						placeholder="password"
						onChange={
							(evt: SyntheticEvent<HTMLInputElement>) => {
								this.password = (evt.target as any).value;
								console.log(this.password);
							}}
					/>
					<label
						className="sr-only"
					>
						please enter password again
					</label>
					<input
						type="password"
						placeholder="again"
						onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
							this.again = (evt.target as any).value;
						}}
					/>
					<div
						className={'password-not-match ' + this.showNotMatched()}
					>
						Email is not valid or password does not match.
					</div>
				</div>
				<div
					className="btn btn-primary"
					onClick={() => this.onCreateAccount()}
				>
					Create Account
				</div>
			</form>
		);
	}

	private showNotMatched(): string {
		return this.state.passwordNotMatched
			? 'd-block'
			: 'd-none';
	}

	private async onCreateAccount(): Promise<void> {
		if (this.password === this.again && testIfEmail(this.email)) {
			await onLocalSignUp(this.email, this.password);
			this.props.store.dispatch(loggedIn());
			this.props.routerProps.history.push('/');
		} else {
			this.setState({passwordNotMatched: true});
		}
	}
}
