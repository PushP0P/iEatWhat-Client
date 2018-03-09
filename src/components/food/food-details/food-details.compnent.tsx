import * as React from 'react';
import {
	FOOD_DETAILS_STATE_INIT, FoodDetailsComponentProps,
	FoodDetailsComponentState
} from '../../../models/food.model';
import { ReactElement } from 'react';
import { Subscription } from '@reactivex/rxjs';
import { LoadingComponent } from '../../reusable/loading/loading.component';
import { VotingComponent } from '../../reusable/voting/voting.component';
import { CategoryComponent } from '../../reusable/categories/category.controlled';
import { IngredientsComponent } from './igredients.controlled';
import { DescriptionComponent } from './description.controlled';
import { foodDetailsReducer } from './food-details.reducer';
import { actionDataReady } from '../../main/main.actions';
import { ReportFetchResponse } from '../../../models/usda/usda.model';
import * as moment from 'moment';
import { eventRequest } from '../../../services/rest-service';
import { transmitEvent } from '../../../services/socket.service';
import { EventResponse } from '../../../models/event-transport.model';
import { actionReportReceived } from './food-details.actions';
import { actionRetrievingReport } from './food-details.actions';

export class FoodDetailsComponent extends React.Component<FoodDetailsComponentProps, FoodDetailsComponentState> {
	public state = FOOD_DETAILS_STATE_INIT;
	private subscriptions: Subscription;

	public async componentDidMount(): Promise<void> {
		this.subscriptions = this.props.store
			.registerStore$(foodDetailsReducer, this.state)
			.subscribe((state: FoodDetailsComponentState) => {
				this.setState(state);
			});
		this.refreshContent();
		console.log('report', this.state.report);
		this.props.store.dispatch(actionDataReady());
	}

	private async refreshContent(): Promise<any> {
		this.props.store.dispatch(actionRetrievingReport());
		const result: EventResponse = await transmitEvent({
			event: 'SEARCH',
			payload: {
				type: 'REPORT',
				body: this.props.routeComponentProps.match.url
					.split('?')[1]
					.split('=')[1]
			}

		});
		if (!result.ok){
			alert('Oh No! No content was found');
			return;
		}
		this.props.store.dispatch(actionReportReceived(result.body));
	}
	public componentWillUnmount(): void {
		this.subscriptions.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		if (this.state.dataReady) {
			return (
				<div
					className="food-details-component"
				>
					<div
						className="content_wrapper"
					>
						<div
							className="food-details_header"
						>
							<div
								className="header_image-box"
							>
								<img
									src={'#'}
									alt={`${this.state.report.name} picture`}
								/>

							</div>
							<h1>{this.state.report.name}</h1>
							<div
								className="header--updated-last"
							>
								{moment(Date.now()).format('LL')}
							</div>
							<div
								className="header--reviewed"
							>
								{this.state.report.reviews || 'No Reviews'}
							</div>
						</div>

						<div
							className="categories_box"
						>
							{this.state.report.categories((tag: string) => {
										return (
											<CategoryComponent
												key={tag}
												tag={tag}
											/>
										);
								})}
						</div>
						<hr />
						<DescriptionComponent
							name={this.state.report.desc.ndb_food_number}
							upc={this.state.report.req}
							type={this.state.report.group}
							updatedOn={this.state.report.lastUpdated}
						/>
						<hr />
						<IngredientsComponent
							// TODO
							ingredients={[]}
						/>
						<hr />
						{/*<CommentsComponent viewId={this.content.desc.food_name}/>*/}
						<hr />
						<VotingComponent/>
					</div>
				</div>
			);
		} else {
			return (
				<LoadingComponent visible={this.state.dataReady}/>
			);
		}
	}
}
