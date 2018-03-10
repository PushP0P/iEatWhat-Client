import * as React from 'react';
import { MAIN_ROUTES_SWITCH } from '../../router/main.routes';
import { MAIN_COMPONENT_STATE_INIT, MainComponentProps, MainComponentState } from '../../models/components/main.model';
import { NAVBAR_LINKS } from '../../models/components/navbar.model';
import { mainReducer } from './main.reducer';
import { NavbarComponent } from './navbar/navbar.component';
import { disabledDropDown } from './main.actions';
import { enabledDropDown } from './main.actions';
import { Subscription } from '@reactivex/rxjs';
import { ReactElement } from 'react';
import { FirebaseUser } from '../../models/auth/firebases-user';
import { loggedIn } from './main.actions';
import { loggedOut } from './main.actions';
import { logOut } from '../../services/auth.service';
import history from './../../router/router.history';

export class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
	public state: MainComponentState = MAIN_COMPONENT_STATE_INIT;
	private subscriptions: Subscription;

	constructor(public props: MainComponentProps) {
		super(props);
		this.menuToggleHandler = this.menuToggleHandler.bind(this);
		this.logInOutHandler = this.logInOutHandler.bind(this);
		this.logoTapHandler = this.logoTapHandler.bind(this);
	}

	public componentDidMount(): void {
		this.subscriptions = this.props.store
			.registerStore$(mainReducer, MAIN_COMPONENT_STATE_INIT)
			.subscribe((res: MainComponentState) => {
				this.setState(res);
			});
		this.subscriptions.add(this.props.auth.currentUser.distinctUntilChanged()
			.subscribe((userAuthState: FirebaseUser) => {
			if (userAuthState) {
				this.props.store.dispatch(loggedIn());
			} else {
				this.props.store.dispatch(loggedOut());
			}
		}));
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
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
				{MAIN_ROUTES_SWITCH(this.props.store, this.props.location)}
			</div>
		);
	}

	private logInOutHandler(): void {
		this.props.auth.currentUserSource.value
			? logOut()
			: history.push('/sign-in');
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
