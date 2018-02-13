export interface LandingComponentProps {

}

export interface LandingComponentState {
	searchResultsVisible: boolean;
	searchValue: string;
}

export const LANDING_STATE_INIT = {
	searchValue: '',
	searchResultsVisible: false
};
