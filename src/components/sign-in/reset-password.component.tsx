import * as React from 'react';
import { ReactElement, SyntheticEvent } from 'react';
import { ModalComponent } from '../reusable/modal/modal.component';
import { ResetPasswordComponentProps, ResetPasswordComponentState } from '../../models/password-reset.model';

export class ResetPasswordComponent extends React.Component<ResetPasswordComponentProps, ResetPasswordComponentState> {

	constructor(public props: ResetPasswordComponentProps) {
		super(props);
		this.modalHandler = this.modalHandler.bind(this);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<form
				className="reset-component"
			>
				<h1>Reset Your Password</h1>
				<p>Please provide your accounts email address and an email will be sent to that accounts email with
					further instructions.</p>

				<input
					type="email"
					placeholder="Email"
					onChange={(evt: SyntheticEvent<HTMLInputElement>) => this.setState({
						email: (evt.target as any).value
					})}
				/>
				<div className="btn btn-lg btn-warning">
					Send Reset Request
				</div>
				<ModalComponent
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

	private modalHandler(evt: SyntheticEvent<HTMLDivElement>): void {
		this.props.history.push('/');
	}
}
