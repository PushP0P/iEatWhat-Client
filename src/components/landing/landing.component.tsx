import * as React from 'react';
import { LANDING_STATE_INIT, LandingComponentProps } from '../../models/components/landing.model';
import { ReactElement } from 'react';
import { LandingComponentState } from '../../models/components/landing.model';
import { Subscription } from '@reactivex/rxjs';
import { LoadingComponent } from '../reusable/loading/loading.component';
import { SearchComponent } from '../search/search.component';
import { landingReducer } from './landing.reducer';
import { actionDataReady } from '../main/main.actions';
import { ReviewsComponent } from '../reviews/reviews.component';

/**
 *  FIXTURES - Placeholders
 */
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;

export class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {
	public state: LandingComponentState = LANDING_STATE_INIT;
	private stateSubscription: Subscription;

	constructor(public props: LandingComponentProps) {
		super(props);
		this.handleStateChange = this.handleStateChange.bind(this);
	}

	public render(): ReactElement<HTMLDivElement> {
		return this.state.dataReady
			? (
				<div
					className="landing-component"
				>
					<SearchComponent
						store={this.props.store}
						routes={this.props.routeProps}
						location={this.props.location}
					/>
					<FooterComponent/>
					<ReviewsComponent/>
				</div>
			) : (
				<LoadingComponent
					visible={!this.state.dataReady}
				/>
			);
	}

	public componentDidMount(): void {
		this.stateSubscription = this.props.store
			.registerStore$ (landingReducer, LANDING_STATE_INIT)
			.subscribe (this.handleStateChange);
		this.props.store.dispatch (actionDataReady ());
	}

	public componentWillUnmount(): void {
		this.stateSubscription.unsubscribe ();
	}

	private handleStateChange(state: LandingComponentState): void {
		this.setState (state);
	}
}
