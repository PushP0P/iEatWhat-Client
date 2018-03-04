import * as React from 'react';
import {
	DASHBOARD_COMPONENT_STATE_INIT, DashboardComponentProps,
	DashboardComponentState
} from '../../models/components/dashboard.model';
import { ReactElement } from 'react';

export class DashboardComponent extends React.Component<DashboardComponentProps, DashboardComponentState> {
	public state: DashboardComponentState = DASHBOARD_COMPONENT_STATE_INIT;

	public render(): ReactElement<HTMLDivElement> {
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
								className="btn btn-primary btn-block"
							>
								Loren Ipsum
							</button>
						</div>

						<div
							className="col-lg-3 col-md-6 col-sm-6"
						>
							<button
								className="btn btn-primary btn-block"
							>
								Loren Ipsum
							</button>
						</div>

						<div
							className="col-lg-3 col-md-6 col-sm-6"
						>
							<button
								className="btn btn-primary btn-block"
							>
								Loren Ipsum
							</button>
						</div>

						<div
							className="col-lg-3 col-md-6 col-sm-6"
						>
							<button
								className="btn btn-primary btn-block"
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
