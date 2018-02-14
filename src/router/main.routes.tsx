import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { LandingComponent } from '../components/landing/landing.component';
import { FoodDetailsComponent } from '../components/food/food-details/food-details.compnent';
import { ResetPasswordComponent } from '../components/sign-in/password-reset/reset-password.component';
import { MapBoxComponent } from '../components/map-box/map-box.component';
import { StoreService } from '../services/store.service';
import { EmailValidationComponent } from '../components/sign-in/email-validation.component';

// TODO Refactor for packed Routes.

// export interface RouteDetails {
// 	todo Set right type
	// path: string;
	// ReactComponent: any;
	// props?: {[props: string]: any};
	// validation?: (component: Component) => any;
// }

// const routesCollection: Set<RouteDetails> = new Set();

// export const RouteTemplate = (props: RouteDetails) => (
		// {/*<Route*/}
			// path={props.path}
			// render={(routes) => {
			// 	props.validation ? props.validation(props.ReactComponent) : '';
			// 	return new props.ReactComponent(props.props || {})
			// }}
		// />
	// );

export const MAIN_ROUTES_SWITCH = (store: StoreService) => {
	return (
		<Switch>
			<Route
				path="/email-validation/:code"
				render={(routes) => {
					return (
						<EmailValidationComponent
							{...routes}
						/>
					);
				}}
			/>
			<Route
				path="/"
				exact={true}
				render={(routes) => {
					return(
						<LandingComponent
							{...routes}
							store={store}
						/>
					);
				}}
			/>
			<Route
				path="/map-box/:mode"
				exact={true}
				render={(routes) => {
					return(
						<MapBoxComponent
							locations={new Map()}
							mapName="Demo"
							{...routes}
							store={store}
						/>
					);
				}}
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
			<Route
				path="/password-reset"
				render={
					(routes) => {
						return(
							<ResetPasswordComponent
								{...routes}
							/>
						);
					}
				}
			/>
			<Route
				path="/food-details"
				render={
					(routes) => {
						return (
							<FoodDetailsComponent
								foodId={'TestFood1234'}
								topic={'Food Details'}
								{...routes}
								store={store}
							/>
						);
					}
				}
			/>
		</Switch>
	);
};
