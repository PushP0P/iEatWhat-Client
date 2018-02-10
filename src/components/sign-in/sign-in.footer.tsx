import * as React from 'react';
import { Link } from 'react-router-dom';

export const SignInFooter = () => {
	return(
		<div
			className="sign_in_footer"
		>
			<div>
				<Link to="/privacy" >
					Privacy
				</Link>
			</div>
			<div>
				<Link to="/legal" >
					Legal Stuff
				</Link>
			</div>
			<div>
				<Link to="/about" >
					About
				</Link>
			</div>
		</div>
	);
};
