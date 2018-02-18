import * as React from 'react';
import { ReactElement, SyntheticEvent } from 'react';
import { ModalComponent } from '../../reusable/modal/modal.component';
import {
	PASSWORD_RESET_STATE_INIT, ResetPasswordComponentProps,
	ResetPasswordComponentState
} from '../../../models/components/password-reset.model';
import { passwordResetReducer } from './password-reset.reducer';
import { toggleModalVisibilityOff, toggleModalVisibilityOn } from './password-reset.actions';
import { resetPasswordHandler } from '../../../services/sign-in.service';

export class ResetPasswordComponent extends React.Component<ResetPasswordComponentProps, ResetPasswordComponentState> {
	public state = PASSWORD_RESET_STATE_INIT;
	private email = '';

	constructor(public props: ResetPasswordComponentProps) {
		super(props);
		this.modalHandler = this.modalHandler.bind(this);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<form
				className="password-reset-component"
			>
				<h1>Reset Your Password</h1>
				<p>Please provide your accounts email address and an email will be sent to that accounts email with
					further instructions.</p>

				<input
					type="email"
					placeholder="Email"
					onChange={(evt: SyntheticEvent<HTMLInputElement>) => this.email = (evt.target as any).value}
				/>
				<div
					className="btn btn-lg btn-warning"
					onClick={() => this.onSendResetHandler()}
				>
					Send Reset Request
				</div>
				<ModalComponent
					visible={this.state.showModal}
					controls={[{
						id: 'EmailResetOk',
						label: 'OK!',
						onClick: this.modalHandler,
					}]}
				>
					<h1>Password Reset Email Sent</h1>
					<p>Check your inbox for an email from <b>PushP0P!</b></p>
				</ModalComponent>
			</form>
		);
	}

	private onSendResetHandler(): void {
		resetPasswordHandler(this.email);
		this.setState(passwordResetReducer(toggleModalVisibilityOn(), this.state));
	}

	private modalHandler(evt: SyntheticEvent<HTMLDivElement>): void {
		this.setState(passwordResetReducer(toggleModalVisibilityOff(), this.state));
		this.props.history.push('/');
	}
}
