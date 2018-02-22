export interface LoadingComponentProps {
	visible: boolean;
}

export interface LoadingComponentState {
	dots: {}[];
}

export const LOADING_INIT: LoadingComponentState = {
	dots: []
};
