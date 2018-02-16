import * as React from 'react';
import { ReactElement } from 'react';
import { Observable, Subject, Subscription } from '@reactivex/rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { SearchBarComponent } from '../reusable/search-bar/search-bar.component';
import { LandingComponentState } from '../../models/landing.model';
import { LANDING_STATE_INIT, LandingComponentProps } from '../../models/landing.model';
import { USDAItem } from '../../models/usda-food.model';
import { USDAReport } from '../../models/usda.model';
import { USDASearchResult } from '../../models/usda-food.model';
import { searchUSDA } from '../../services/search.service';
import { landingReducer } from './landing.reducer';
import { actionSelectItem } from './landing.actions';
import { actionDataReady } from '../main/main.actions';
import { actionShowResults } from './landing.actions';
import { USDASearchResponse } from '../../models/usda-food.model';

/**
 *  FIXTURES - Placeholders
 */
export const NavbarComponent = () => <div>NAVBAR PLACEHOLDER</div>;
export const FooterComponent = () => <div>FOOTER PLACEHOLDER</div>;

interface SearchResultsProps {
	searchResults: USDAItem[];
	itemSelectHandler: (ndbno: string) => {};
	visible: boolean;
}

export const SearchResultsComponent = (props: SearchResultsProps) => {
	console.log('props', props);
	const display = props.visible ? 'flex' : 'none';
	const results: USDAItem[] = !props.searchResults ? [] : props.searchResults;
	console.log('map', results);
	return (
		<div
			style={{
				display: display
			}}
			className="search-results-component"
		>
			{results.map(item => {
				return (
					<div
						key={item.ndbno.toString()}
						className="search-item"
						onClick={() => {
							props.itemSelectHandler(item.ndbno);
						}}
					/>
				);
			})}
		</div>
	);
};

export class LandingComponent extends React.Component<LandingComponentProps, LandingComponentState> {
	public state = LANDING_STATE_INIT;
	public inputChangeSource: Subject<string> = new Subject<string>();
	public inputChange$: Observable<string> = this.inputChangeSource.asObservable();
	private stateSubscription: Subscription;

	constructor(public props: LandingComponentProps) {
		super(props);
		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
		this.queryHandler = this.queryHandler.bind(this);
		this.inputValueChangeHandler = this.inputValueChangeHandler.bind(this);
	}

	public componentDidMount(): void {
		this.stateSubscription = this.props.store.registerStore$(landingReducer, LANDING_STATE_INIT)
			.subscribe((state: LandingComponentState) => {
				this.setState(state);

			});
		this.props.store.dispatch(actionDataReady());

		this.stateSubscription
			.add(this.inputChange$
				.distinctUntilChanged()
				.debounceTime(3000)
				.subscribe(nextVal => {
					console.log('res', nextVal);
				}
		));
	}

	public componentWillUnmount(): void {
		this.stateSubscription.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		console.log('landing state', this.state);
		return this.state.dataReady
			? (
				<div
					className="landing-component container"
				>
					<NavbarComponent />
					<SearchBarComponent
						onQuery={this.queryHandler}
						onInputChange={this.inputValueChangeHandler}
					/>
					<SearchResultsComponent
						searchResults={this.state.searchResults || []}
						itemSelectHandler={this.foodItemSelectHandler}
						visible={this.state.searchResultsVisible}
					/>
					<FooterComponent />
				</div>
			) : (
				<LoadingComponent
					visible={!this.state.dataReady}
				/>
			);
	}

	private inputValueChangeHandler(value: string) {
		this.inputChangeSource.next(value);
	}

	private async queryHandler(): Promise<void> {
		const searchResult: USDASearchResponse = await searchUSDA({
			params: {
				query: this.state.searchValue,
			},
			requestType: 'search'
		});
		console.log('food search results', searchResult);
		this.props.store.dispatch(actionShowResults(searchResult.list.item));
	}

	private async foodItemSelectHandler(ndbno: string): Promise<void> {
		const food: USDASearchResult  = await searchUSDA({
			requestType: 'food',
			params: {
				ndbno: [ndbno],
				type: 'f',
				format: 'JSON'
			},
		});

		console.log('Report', food);
		this.props.store
			.dispatch(actionSelectItem(food as USDAReport));
	}
}
