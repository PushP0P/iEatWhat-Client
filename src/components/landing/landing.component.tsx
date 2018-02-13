import * as React from 'react';
import { ReactElement } from 'react';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LandingComponentProps, LandingComponentState } from '../../models/landing.model';
import { BehaviorSubject, Observable, Subscription } from '@reactivex/rxjs';
import { queryFood, transformInputValToQuery } from '../../services/search.service';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR PLACEHOLDER</div>;
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;
export const SearchResultsComponent = (props: any) => <div>SEARCH RESULTS PLACEHOLDER</div>;

export class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {
	private searchValueSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
	private searchValue$: Observable<string> = this.searchValueSource.asObservable();
	private subscriptions: Subscription;

	constructor(public props: any) {
		super(props);
		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
		this.queryHandler = this.queryHandler.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	public componentDidMount(): void {
		addEventListener('onKeyUp', (evt: KeyboardEvent) => {
			evt.preventDefault();
			if (evt.key) {
				this.queryHandler();
			}
		});
		this.subscriptions = this.searchValue$.subscribe((searchVal: string) => {
			this.setState({
				searchValue: searchVal
			});
		});
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="landing-component container"
			>
				<NavbarComponent />
				<SearchBarComponent
					onQuery={this.queryHandler}
					onInputChange={this.handleInputChange}
				/>
				<SearchResultsComponent
					onItemSelect={this.foodItemSelectHandler}
				/>
				<FooterComponent />
				<DashboardComponent />
			</div>
		);
	}

	private handleInputChange(val: string): void {
		this.searchValueSource.next(val);
	}

	private async queryHandler(): Promise<void> {
		const query = await queryFood(transformInputValToQuery(this.state.searchValue));
		console.log('Query return', query);
	}

	private foodItemSelectHandler(evt: Event, foodItemId: string): void {
		console.log('kthxbye');
	}
}
