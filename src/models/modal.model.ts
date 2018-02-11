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
	visible: boolean;
}
