import * as React from 'react';
import { NavbarProps } from '../../../models/components/navbar.model';
import { ReactElement } from 'react';
import { SVGS } from '../../../assets/react-svgs.asset';
import { Link } from 'react-router-dom';
import { NavLink } from '../../../models/components/navbar.model';

export const NavbarComponent = (props: NavbarProps): ReactElement<HTMLDivElement> => {
	function onDropDownClass(): string {
		return props.isExtended
			? 'extended'
			: '';
	}

	return (
		<div
			className="navbar-component col-sm-12"
		>
			<div
				className="navbar_header"
			>
				<div
					className="left"
				>
					<div
						className="menu-icon"
						onClick={() => props.onMenuToggle()}
					>
						{SVGS.menu}
					</div>
					<div
						className="iEatWhat-logo"
						onClick={() => props.onLogoTap()}
					>
						{SVGS.iEatWhat}
					</div>
				</div>
				<div
					className="right"
				>
					<span
						className="nav_login h3"
						onClick={() => props.onLogOut()}
					>
						{
							props.isLoggedIn
							? 'Logout'
							: 'Login'
						}
					</span>
				</div>
			</div>
			<div
				className={'navbar_drop-down ' + onDropDownClass()}
			>
				{props.links.map((link: NavLink) => {
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
};
