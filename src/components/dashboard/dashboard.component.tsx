import * as React from 'react';
import {
	DASHBOARD_COMPONENT_STATE_INIT, DashboardComponentProps,
	DashboardComponentState
} from '../../models/dashboard.model';

export class DashboardComponent extends React.Component<DashboardComponentProps, DashboardComponentState> {
	constructor(public props: DashboardComponentProps) {
		super(props);
		this.state = DASHBOARD_COMPONENT_STATE_INIT;
	}

	public render() {
		return (
			<div>
				<div
					className="container-fluid"
				>
					<div
						className="row"
					>
						<div
							className="col-lg-3 col-md-6 col-sm-6"
						>
							<button
								className="btn btn-primary btn-block btn-dashboard"
							>
								Loren Ipsum
							</button>
						</div>

						<div
							className="col-lg-3 col-md-6 col-sm-6"
						>
							<button
								className="btn btn-primary btn-block btn-dashboard"
							>
								Loren Ipsum
							</button>
						</div>

						<div
							className="col-lg-3 col-md-6 col-sm-6"
						>
							<button
								className="btn btn-primary btn-block btn-dashboard"
							>
								Loren Ipsum
							</button>
						</div>

						<div
							className="col-lg-3 col-md-6 col-sm-6"
						>
							<button
								className="btn btn-primary btn-block btn-dashboard"
							>
								Loren Ipsum
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}