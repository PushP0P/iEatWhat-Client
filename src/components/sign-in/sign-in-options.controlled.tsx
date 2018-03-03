import * as React from 'react';
import { SignInOption, SignInOptionsProps } from '../../models/components/sign-in.model';
import { SVGS } from '../../assets/react-svgs.asset';

export const SignInOptions = (props: SignInOptionsProps) => {
	return (
		<div
			className="sign-in_options"
		>
			{props.signInOptions
				.map((signInOption: SignInOption) => {
					return (
						<div
							key={signInOption.id.toString()}
							className="sign-in_option btn btn-primary"
							onClick={() => {
								signInOption.handler();
							}}
						>
							<div
								className="option_icon"
							>
								{SVGS[signInOption.icon]}
							</div>
							<div
								className="option_text"
							>
								<div
									className="option_blurb"
								>
									Log in with
								</div>
								<div
									className="option_title header"
								>
									{signInOption.title}
								</div>
							</div>
						</div>
					);
				})
			}
		</div>
	);
};
