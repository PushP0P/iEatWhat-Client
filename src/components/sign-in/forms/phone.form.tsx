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
				className="input-group-text"
				type="tel"
				placeholder="phone number"
				onChange={(evt: any) => phoneNumber = evt.target.value}
			/>
			<div
				className="btn btn-outline-success"
				onClick={() => props.onSubmit(phoneNumber)}
			>
<<<<<<< HEAD
				Sign-In With Phone
=======
				SignIn With Phone
>>>>>>> f43aadde671f71f64b2219346c26558d03d1637a
			</div>
		</form>
	);
};
