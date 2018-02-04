import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { LandingComponent } from '../components/landing/landing.component';

export const MAIN_ROUTES_SWITCH = () => {
	return (
		<Switch>
			<Route
				path="/"
				render={
					(routes) => {
						return(
							<LandingComponent
								{...routes}
							/>
						)
					}
				}
			/>
			<Route
				path="/sign-in"
				render={
					(routes) => {
						return (
							<SignInComponent
								{...routes}
							/>
						);
					}
				}
			/>
		</Switch>
	);
};
