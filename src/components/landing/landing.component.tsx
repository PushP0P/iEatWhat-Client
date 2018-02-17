import * as React from 'react';
import { LANDING_STATE_INIT, LandingComponentProps } from '../../models/landing.model';
import { ReactElement } from 'react';
import { Subscription } from '@reactivex/rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { SearchComponent } from '../reusable/search/search.component';
import { LandingComponentState } from '../../models/landing.model';
import { landingReducer } from './landing.reducer';
import { actionDataReady } from '../main/main.actions';
import { SVGS } from '../../assets/react-svgs.asset';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR PLACEHOLDER</div>;
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;

export class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {
	public state: LandingComponentState = LANDING_STATE_INIT;
	private stateSubscription: Subscription;

	// private inputChangeSource: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor(public props: LandingComponentProps) {
		super (props);
		this.handleStateChange = this.handleStateChange.bind(this);
	}

	public render(): ReactElement<HTMLDivElement> {
		return this.state.dataReady
			? (
				<div
					className="landing-component container"
				>
					<h1 className="header-test">Im a landing</h1>
					<NavbarComponent/>
					<SearchComponent
						store={this.props.store}
						routes={this.props.routeProps}
					/>
					<FooterComponent/>
					{SVGS.iEatFork}
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
