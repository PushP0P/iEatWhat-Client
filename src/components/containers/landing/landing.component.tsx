import * as React from 'react';
import { Link } from 'react-router-dom';

export class LandingComponent extends React.Component {
	// tslint:disable
	constructor(public props: any) {
		super(props);
	}
	public render() {
		return(
			<div
				className="landing-component container"
			>
				<h1>Landing Component</h1>

				TODO...

				<Link to={'/sign-in'}>Sign In</Link>

			</div>
		);
	}
}
