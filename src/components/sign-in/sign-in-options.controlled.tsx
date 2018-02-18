import * as React from 'react';
import { SignInOption, SignInOptionsProps } from '../../models/components/sign-in.model';
import { SVGS } from '../../assets/react-svgs.asset';

export const SignInOptions = (props: SignInOptionsProps) => {
	return (
		<div
			className="sign-in-options"
		>
			{props.signInOptions
				.map((signInOption: SignInOption) => {
					return (
						<div
							key={signInOption.id.toString()}
							className={`sign_in_option btn-lg btn-outline-primary`}
							onClick={() => {
								signInOption.handler();
							}}
						>
							<div
								className="sign_in_title"
							>
								{signInOption.title}
							</div>
							{SVGS[signInOption.icon]}
						</div>
					);
				})
			}
		</div>
	);
};
