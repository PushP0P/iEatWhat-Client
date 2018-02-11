import * as React from 'react';
import { SyntheticEvent } from 'react';
import { MODAL_STATE_INIT, ModalComponentProps, ModalComponentState, ModalControl } from '../../../models/modal.model';
import { modalReducer } from './modal.reducer';
import { toggleVisibilityOn } from './modal.actions';

export class ModalComponent extends React.Component<ModalComponentProps, ModalComponentState> {
	public state = MODAL_STATE_INIT;

	render() {
		return(
			<div
				className="modal-component"
				hidden={this.state.visible}
			>
				{this.props.children}
				<div
					className="control_box"
				>
					{this.props.controls.map((control: ModalControl ) => {
						return (
							<div
								key={control.id}
								className="modal-control"
								onClick={(event: SyntheticEvent<HTMLDivElement>) => {
									control.onClick(event);
									this.setState(modalReducer(toggleVisibilityOn(), this.state));
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
	}
}
