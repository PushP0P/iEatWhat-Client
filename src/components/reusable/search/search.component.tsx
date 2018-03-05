import * as React from 'react';
import { ReactElement } from 'react';
import { Observable } from '@reactivex/rxjs';
import { Subscription } from '@reactivex/rxjs';
import { Subject } from '@reactivex/rxjs';
import { SearchComponentProps } from '../../../models/components/search.model';
import { SearchComponentState } from '../../../models/components/search.model';
import { SearchResultsComponent } from './search-result.controlled';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { searchByTerms } from '../../../services/search.service';
import { searchReducer } from './search.reducer';
import { USDAItem } from '../../../models/usda/usda-food.model';
import { SearchFetchResponse } from '../../../models/usda/usda.model';
import { SEARCH_STATE_INIT } from '../../../models/components/search.model';
import { USDA_SEARCH_KEYS } from '../../../models/usda/usda.model';
import { LoadingComponent } from '../loading/loading.component';
import { actionSearching } from './search.actions';
import { actionSearchDone } from './search.actions';

export class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
	public state: SearchComponentState = SEARCH_STATE_INIT;
	private searchInputSource: Subject<string> = new Subject<string>();
	private enterInputSource: Subject<string> = new Subject<string>();
	private inputChanged$: Observable<string> = this
		.enterInputSource
		.merge(this.searchInputSource.debounce(() => Observable.interval(3000)))
		.distinctUntilChanged();
	private results: USDAItem[] = [];
	private subscriptions: Subscription;

	get getResultPage(): USDAItem[] {
		return this.results.length > 20 ?  this.results.slice(0, 19) : this.results;
	}

	constructor(public props: SearchComponentProps) {
		super(props);

		this.foodItemSelectHandler = this.foodItemSelectHandler.bind(this);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="search-component"
			>
				<SearchBarComponent
					handleInputChange={this.searchInputSource}
					handleEnterPress={this.enterInputSource}
				/>
				{this.state.nowSearching
					? (
						<LoadingComponent
							visible={this.state.nowSearching}
						/>
					) : (
						<SearchResultsComponent
							items={this.getResultPage}
							dispatch={this.props.store.dispatch}
							selectHandler={this.foodItemSelectHandler}
							visible={this.state.resultsVisible}
							pageNumber={this.state.resultsPage}
						/>
					)}
			</div>
		);
	}

	public componentDidMount(): void {
		this.subscriptions = this.props.store
			.registerStore$(searchReducer, SEARCH_STATE_INIT)
			.subscribe((state: SearchComponentState) => {
				console.log('state', state);
				this.setState(state);
			});
		this.subscriptions
			.add(this.inputChanged$
				.subscribe((searchTerm: string) => {
				this.makeQuery(searchTerm);
			}));
	}

	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	private async makeQuery(searchTerm: string): Promise<void> {
		this.props.store.dispatch(actionSearching());
		const result: SearchFetchResponse | void = await searchByTerms({
			params: {
				[USDA_SEARCH_KEYS.searchTerms]: searchTerm
			},
			requestType: 'search'
		}) as SearchFetchResponse;
		if (result && 'errors' in result) {
			return;
		}
		this.results = await result.list.item;
		this.props.store.dispatch(actionSearchDone());
		console.log('state', this.results);
	}

	private foodItemSelectHandler(ndbno: string): any {
		this.props.routes.history.push('food-details/' + ndbno);
	}
}
