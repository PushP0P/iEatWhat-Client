import * as React from 'react';
import { SyntheticEvent } from 'react';
import { ModalComponentProps, ModalControl } from '../../../models/modal.model';

export const ModalComponent = (props: ModalComponentProps) => {
	const hiddenStyle = () => {
		return {
			display: props.visible ? 'flex' : 'none'
		};
	};

	return (
		<div
			className="modal-component"
			style={{...hiddenStyle()}}
		>
			{props.children}
			<div
				className="control_box"
			>
				{props.controls.map((control: ModalControl ) => {
					return (
						<div
							key={control.id}
							className="modal-control"
							onClick={(event: SyntheticEvent<HTMLDivElement>) => {
								control.onClick(event);
							}}
							style={control.style || {}}
						>
							{control.label}
						</div>
					);
				})}
			</div>
		</div>
	);
};
