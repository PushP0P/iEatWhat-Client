import { StoreService } from '../../services/store.service';

export interface NavLink {
	display: string;
	link: string;
}

export interface NavbarProps {
	links: NavLink[];
	store: StoreService;
}

export interface NavbarState {
	isLoggedIn: boolean;
	isExtended: boolean;
	isExtendable: boolean;
}

export const NAVBAR_STATE_INIT: NavbarState = {
	isLoggedIn: false,
	isExtended: false,
	isExtendable: false
};
