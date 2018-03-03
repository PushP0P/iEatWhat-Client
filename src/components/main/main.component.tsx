import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from '../../router/main.routes';
import { MAIN_COMPONENT_STATE_INIT, MainComponentProps, MainComponentState } from '../../models/components/main.model';
import { mainReducer } from './main.reducer';
import { Subscription } from '@reactivex/rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { NAVBAR_LINKS } from '../../models/components/navbar.model';
import { disabledDropDown } from './main.actions';
import { enabledDropDown } from './main.actions';
import history from './../../router/router.history';
import { ReactElement } from 'react';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
	public state: MainComponentState = MAIN_COMPONENT_STATE_INIT;
	private stateSubscribe: Subscription;

	constructor(public props: MainComponentProps) {
		super(props);
		this.menuToggleHandler = this.menuToggleHandler.bind(this);
		this.logInOutHandler = this.logInOutHandler.bind(this);
		this.logoTapHandler = this.logoTapHandler.bind(this);
	}

	public componentDidMount(): void {
		this.stateSubscribe = this.props.store
			.registerStore$(mainReducer, MAIN_COMPONENT_STATE_INIT)
			.subscribe((res: MainComponentState) => {
				this.setState(res);
			});
	}

	public componentWillUnmount(): void {
		this.stateSubscribe.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="primary-layout container"
			>
				<NavbarComponent
					links={NAVBAR_LINKS}
					onLogoTap={this.logoTapHandler}
					onLogOut={this.logInOutHandler}
					onMenuToggle={this.menuToggleHandler}
					isExtended={this.state.navbarIsExtended}
					isExtendable={this.state.isWideScreen}
					isLoggedIn={this.state.isLoggedIn}

				/>
				{MAIN_ROUTES_SWITCH(this.props.store)}
			</div>
		);
	}

	private logInOutHandler(): void {

		console.log('log out clicked');
	}

	private logoTapHandler(): void {
		history.push('/');
	}

	private menuToggleHandler(): void {
		this.state.navbarIsExtended
			? this.props.store.dispatch(disabledDropDown())
			: this.props.store.dispatch(enabledDropDown());
	}
}
