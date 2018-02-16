import * as React from 'react';
import { DestinationDetails } from '../../models/map-box.model';
import { FoodItem } from '../../models/food.model';
import { CategoryComponent } from '../reusable/categories/category.controlled';
import * as moment from 'moment';
import { Hoverable } from '../reusable/hoverable/hoverable.component';

interface InfoPanelControlledProps {
	collapsed: boolean;
	sideList: string[];
	imgURL: string;
	targetDetails: DestinationDetails;
	product: FoodItem;
	navigationMode: string;
	eta: number;
}

export const InfoPanelComponent = (props: InfoPanelControlledProps) => {
	return (
		<div
			className="info-panel-component"
		>
			<div
				className="info_header"
			>
				<Hoverable
					icon="food"
					label="Food Item"
				>
					<ul>
						<span
							className="food-details_title"
						>
							{props.product.foodName}
						</span>
						<li>
							{props.product.categoryTags.map(
								tag => {
									return (
										<CategoryComponent
											key={tag}
											tag={tag}
										/>
									);
								}
							)}
						</li>
						<li>
							Reviews: {props.product.reviews}
						</li>
						<li>
							ISBN / ID: {props.product.isbn}
						</li>
					</ul>
				</Hoverable>
				<div>
					<Hoverable
						label={props.targetDetails.businessName}
						icon={'building'}
					>
						<ul>
							<li>
								{props.targetDetails.street}
							</li>
							<li>
								{props.targetDetails.city}
								{props.targetDetails.zipCode}
							</li>
							<li>
								{props.targetDetails.county}
							</li>
						</ul>
					</Hoverable>
				</div>
				<div>
					{props.navigationMode}
				</div>
				<div>
					<Hoverable
						label={`Arive in: ${moment(props.eta).format('LT')}`}
						icon="map-marker"
					/>
				</div>
			</div>
		</div>
	);
};
