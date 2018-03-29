import * as React from 'react';
import { DestinationDetails } from '../../models/components/map-box/map-box.model';
import { FoodProduct } from '../../models/food.model';
import { CategoryBadgeComponent } from '../reusable/categories/category.controlled';
import * as moment from 'moment';
import { Hoverable } from '../reusable/hoverable/hoverable.component';

interface InfoPanelControlledProps {
	collapsed: boolean;
	sideList: string[];
	imgURL: string;
	targetDetails: DestinationDetails;
	product: FoodProduct;
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
					label="Food Item"
				>
					<ul>
						<span
							className="food-details_title"
						>
							{props.product.foodName}
						</span>
						<li>
							{props.product.categories.map(
								(category: string) => {
									return (
										<CategoryBadgeComponent
											key={category}
											category={category}
										/>
									);
								}
							)}
						</li>
						<li>
							Reviews: {
							// todo reviews
							'0'
							}
						</li>
					</ul>
				</Hoverable>
				<div>
					<Hoverable
						label={props.targetDetails.businessName}
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
					>
						Map Marker
					</Hoverable>
				</div>
			</div>
		</div>
	);
};
