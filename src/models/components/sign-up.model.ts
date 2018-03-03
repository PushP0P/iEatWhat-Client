import { RouteComponentProps } from 'react-router';
import { StoreService } from '../../services/store.service';

export interface SignUpProps {
	routerProps: RouteComponentProps<HTMLDivElement>;
	store: StoreService;
}

export interface SignUpState {
	passwordNotMatched: boolean;
}

export const SIGN_UP_STATE_INIT = {
	passwordNotMatched: false
};
