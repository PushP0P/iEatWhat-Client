import * as React from 'react';
import { Route, Switch } from 'react-router';
import { LandingComponent } from '../components/containers/landing/landing.component';
import { SignInComponent } from '../components/containers/sign-in/sign-in.component';

export const MAIN_ROUTES_SWITCH = () => {
	return (
		<Switch>
			<Route
				path="/"
				exact={true}
				render={
					(routes) => {
						return (
							<LandingComponent
								{...routes}
							/>
						);
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
