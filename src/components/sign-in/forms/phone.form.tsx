import * as React from 'react';

interface PhoneFormProps {
	onSubmit: (phoneNumber: string) => any;
}

export const PhoneSignInForm = (props: PhoneFormProps) => {
	// Mutation ok? ><
	let phoneNumber: string = '';
	return (
		<form
			className="phone-form"
		>
			<input
				className="question"
				type="tel"
				placeholder="phone number"
				onChange={(evt: any) => phoneNumber = evt.target.value}
			/>
			<div
				className="btn btn-outline-success"
				onClick={() => props.onSubmit(phoneNumber)}
			>
				SignIn With Phone
			</div>
		</form>
	);
};
