import { SyntheticEvent } from 'react';

export interface ModalControl {
	id: string;
	label: string;
	onClick: (event: SyntheticEvent<HTMLDivElement>) => void;
	style?: {};
}

export interface ModalComponentProps {
	controls: ModalControl[];
	children?: any;
}

export interface ModalComponentState {
	visible: boolean;
}

export const MODAL_STATE_INIT: ModalComponentState = {
	visible: false
};
