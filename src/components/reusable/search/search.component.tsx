import * as React from 'react';
import { ReactElement } from 'react';
import { Observable } from '@reactivex/rxjs';
import { Subscription } from '@reactivex/rxjs';
import { Subject } from '@reactivex/rxjs';
import { SearchComponentProps } from '../../../models/components/search.model';
import { SearchComponentState } from '../../../models/components/search.model';
import { SearchResultsComponent } from './search-result.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { searchReducer } from './search.reducer';
import { LoadingComponent } from '../loading/loading.component';
import { transmitEvent } from '../../../services/socket.service';
import { USDAItem } from '../../../models/usda/usda-food.model';
import { SEARCH_STATE_INIT } from '../../../models/components/search.model';
import { FoodProduct } from '../../../models/food.model';

export class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
	public state: SearchComponentState = SEARCH_STATE_INIT;
	private searchInputSource: Subject<string> = new Subject<string> ();
	private enterInputSource: Subject<string> = new Subject<string> ();
	private inputChanged$: Observable<string> = this.searchInputSource.asObservable ();
	private onPress$: Observable<string> = this.enterInputSource.asObservable ();
	private results: FoodProduct[] = [];
	private subscriptions: Subscription;

	get getResultPage(): USDAItem[] {
		return this.results.length > 20 ? this.results.slice (0, 19) : this.results;
	}

	constructor(public props: SearchComponentProps) {
		super (props);
		this.foodItemSelectHandler = this.foodItemSelectHandler.bind (this);
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
							products={this.results}
							dispatch={this.props.store.dispatch}
							selectHandler={this.foodItemSelectHandler}
							visible={!this.state.nowSearching}
							pageNumber={0}
							location={this.props.location.locationSource.value}
						/>
					)}
			</div>
		);
	}

	public componentDidMount(): void {
		this.subscriptions = this.props.store
			.registerStore$ (searchReducer, SEARCH_STATE_INIT)
			.subscribe ((state: SearchComponentState) => {
				this.setState (state);
			});
	}

	public componentWillUnmount(): void {

		this.subscriptions.unsubscribe ();
		// Receives an input and will emit on 1s for a query.
		const search$: Observable<string> = this.inputChanged$
			.distinctUntilChanged ()
			.debounce (
				() => Observable.interval (1000)
			).merge (
				this.onPress$.distinctUntilChanged ()
			);
		this.subscriptions.add(search$.subscribe (
			async (searchTerm: string) => {
				transmitEvent ({
					event: 'SEARCH',
					payload: {
						type: 'TERMS_SEARCH',
						body: searchTerm,
					}
				});
		}));
	}

	private foodItemSelectHandler(ndbno: string): any {
		this.props.routes.history.push ('food-details/' + ndbno);
	}
}
