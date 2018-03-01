import * as React from 'react';
import { NavbarProps } from '../../models/components/navbar.model';
import { NavbarState } from '../../models/components/navbar.model';
import { NAVBAR_STATE_INIT } from '../../models/components/navbar.model';
import { ReactElement } from 'react';
import { SVGS } from '../../assets/react-svgs.asset';
import { Link } from 'react-router-dom';
import { NavLink } from '../../models/components/navbar.model';
import { Subscription } from '@reactivex/rxjs';
import { navbarReducer } from './navbar.reducer';
import { disabledDropDown } from './navbar.actions';
import { enabledDropDown } from './navbar.actions';

export class NavbarComponent extends React.Component<NavbarProps, NavbarState> {
	public state: NavbarState = NAVBAR_STATE_INIT;
	private subscriptions: Subscription;

	public componentDidMount(): void {
		this.subscriptions = this.props.store.registerStore$(navbarReducer, NAVBAR_STATE_INIT)
			.subscribe((state: NavbarState) => {
				this.setState(state);
			});
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="navbar-component"
			>
				<div
					className="navbar_header"
				>
					<div
						className="left"
					>
						<div
							className="menu-icon"
							onClick={() => this.onMenuToggle()}
						>
							{SVGS.menu}
						</div>
						<div
							className="iEatWhat-logo"
						>
							{SVGS.iEatWhat}
						</div>
					</div>
					<div
						className="right"
					>
						{this.state.isLoggedIn
							? (
								<h2
									onClick={() => this.onLogOut()}
								>
									Logout
								</h2>
							) : (
								<Link
									to="/sign-in"
								>
									<h2>Login</h2>
								</Link>
							)
						}
					</div>
				</div>
				<div
					className="navbar_drop-down"
				>
					{this.props.links.map((link: NavLink) => {
						return(
							<Link
								to={link.link}
								key={link.link}
							>
								{link.display}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}

	private onLogOut(): void {
		console.log('log out clicked');
	}

	private onMenuToggle(): void {
		this.state.isExtended
			? this.props.store.dispatch(disabledDropDown())
			: this.props.store.dispatch(enabledDropDown());
	}
}
