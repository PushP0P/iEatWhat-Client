import * as React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { EmailValidationProps, EmailValidationState } from '../../models/components/email-validation.model';
import { EMAIL_VALIDATION_STATE_INIT } from '../../models/components/email-validation.model';
import { handleEmailVerification } from '../../services/sign-in.service';

export class EmailValidationComponent extends React.Component<EmailValidationProps, EmailValidationState> {
	public state: EmailValidationState = EMAIL_VALIDATION_STATE_INIT;

	public componentDidMount(): void {
		const code: string = this.props.match.params.code;
		this.setState({
			code: code,
			dataReady: true
		});
	}

	public render(): ReactElement<HTMLDivElement> {
		if (handleEmailVerification(this.state.code)) {
			return(
				<div
					className="email-validation-component"
				>
					{this.renderSuccess()}
				</div>
			);
		} else {
			return(
				<div
					className="email-validation-component"
				>
					{this.renderError()}
				</div>
			);
		}
	}

	private renderSuccess(): ReactElement<HTMLDivElement> {
		return(
			<div>
				<h1>Woot! :) Your email is now verified. </h1>
				<p>You can now login to your <Link to="/dashboard" children="dashboard" />!
					Please visit <Link to="/dashboard/food-preferences" children="Food Preferences"/> to personalize
					your services.
					You may edit your information or link social accounts in your
					<Link to="/dashboard/account" children="Account Settings" /> page and we are available by
					<a href="mailto:web-client+ieatwhat.liftoff@gmail.com">email</a> for any questions or concerns. </p>
			</div>
		);
	}

	private renderError(): ReactElement<HTMLDivElement> {
		return(
			<div>
				<h1>Sorry, this page is invalid</h1>
				<p>We are available via <a href="mailto:fromClient+ieatwhat.liftoff@gmail.com">email</a>
					for any questions or concerns. </p>
			</div>
		);
	}
}
