import * as React from 'react';
import { eventRequest } from '../../../services/rest-service';

export class BackendTests extends React.Component<any, {[prop: string]: any}> {
	public type: string = '';
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
					onChange={(evt) => {
						this.type = evt.target.value;
					}}
				/>

				<label>Payload:</label>
				<input
					id="Type"
					type="text"
					onChange={(evt) => {
						this.payload = evt.target.value;
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
		const event = {type: this.type, payload: this.payload};
		const response = await eventRequest(event);

		if (!response) {
			this.setState({
				response: 'No Response!'
			});
			return;
		}
		const parsed = JSON.parse(response);

		if (!(parsed.ok)) {
			this.setState({
				response: `Not OK! ${response}`
			});
			return;
		}

		this.setState({
			response: response
		});
	}
}
