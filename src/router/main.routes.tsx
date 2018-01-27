import * as React from 'react'
import {Route, Switch} from 'react-router';
import {LandingComponent} from '../components/containers/landing/landing.component';

export const MAIN_ROUTES_SWITCH = (props) => {
	return <Switch>
		<Route
			path="/"
			render={
				(routes) => {
					return <LandingComponent
						{...routes}
					/>
				}
			}
		/>
		<Route
			path="/sign-in"
			render={
				(routes) => {
					<SignInComponent
						{...routes}
					/>
				}
			}
		/>
	</Switch>;
};
