import * as React from 'react';
import { Link } from 'react-router-dom';

interface EmailFormProps {
	onSubmit: (email: string, password: string) => any;
}

export const EmailSignInForm = (props: EmailFormProps) => {
	let email: string = '';
	let password: string = '';
	return (
		<form
			className="email-pass-form"
		>
			<div
				className="inputs"
			>
				<input
					className="question"
					type="text"
					placeholder="email"
					onChange={(evt: any) => email = evt.target.value}
				/>
				<input
					className="question"
					type="password"
					placeholder="password"
					onChange={(evt: any) => password = evt.target.value}
				/>
			</div>
			<div
				className="btn btn-outline-success"
				onClick={() => props.onSubmit(email, password)}
			>
				SignIn
			</div>
			<Link to={'/password-reset'}>
				Forgot Password?
			</Link>
		</form>
	);
};
