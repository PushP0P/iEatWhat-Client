export interface NavLink {
	display: string;
	link: string;
}

export interface NavbarProps {
	links: NavLink[];
	onMenuToggle: () => void;
	onLogoTap: () => void;
	onLogOut: () => void;
	isLoggedIn: boolean;
	isExtended: boolean;
	isExtendable: boolean;
}

export const NAVBAR_LINKS: NavLink[] = [
	{
		link: '/dashboard',
		display: 'Dashboard'
	},
	{
		link: '/account',
		display: 'Account'
	},
	{
		link: '/categories',
		display: 'Categories'
	},
	{
		link: '/about',
		display: 'About'
	}
];
