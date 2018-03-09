import * as React from 'react';
import { SyntheticEvent } from 'react';
import { transmitEvent } from '../../../services/socket.service';

export class BackendTests extends React.Component<any, {[prop: string]: any}> {
	public type: string = '';
	public event: string = '';
	public payload: string = '';
	public response: string = '';
	public state = {response: 'No Response Yet...'};
	public render() {
		return(
			<div
				className="tester"
			>
				<label>Type:</label>
				<input
					id="Type"
					type="text"
					onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
						this.type = (evt.target as any).value;
					}}
					onBlur={(evt: SyntheticEvent<HTMLInputElement>)  => {
						this.type = (evt.target as any).value;
					}}
				/>
				<input
					id="Event"
					type="text"
					onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
						this.event = (evt.target as any).value;
					}}
					onBlur={(evt: SyntheticEvent<HTMLInputElement>)  => {
						this.event = (evt.target as any).value;
					}}
				/>

				<label>Body:</label>
				<input
					id="Payload"
					type="text"
					onChange={(evt) => {
						this.payload = evt.target.value;
					}}
					onBlur={(evt: SyntheticEvent<HTMLInputElement>)  => {
						this.payload = (evt.target as any).value;
					}}
				/>
				<div
					className="btn btn-lg btn-outline-success submit"
					onClick={() => this.sendEvent()}
				>
					SUBMIT
				</div>

				<div
					className="response-view"
				>
					<h2>{this.state.response}</h2>
				</div>
			</div>
		);
	}

	private async sendEvent(): Promise<any> {
		const event = {
			event: this.event,
			payload: {
				type: this.type,
				body: this.payload
			}
		};
		const response = await transmitEvent(event);
		console.log('Test Back', response);

		if (!response.ok) {
			this.setState({
				response: 'Response not ok! ' + response.message
			});
			return;
		}
		this.setState({
			response: response.body
		});
	}
}
