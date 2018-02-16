import * as React from 'react';
import { ReactElement } from 'react';
import { MAP_BOX_STATE_INIT , MapBoxComponentProps, MapBoxComponentState } from '../../models/map-box.model';
import { InfoPanelComponent } from './info-panel.controlled';
import  * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';

export class MapBoxComponent extends React.Component<MapBoxComponentProps, MapBoxComponentState> {
	public state = MAP_BOX_STATE_INIT;
	private map: Map;

	public componentDidMount(): void {
		console.log('loaded map');
		this.map = new mapboxgl.Map({
			container: 'MapContainer',
			style: 'mapbox://styles/mapbox/light-v10'
		});
		console.log('map', this.map);
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="map-box-component"
			>
				<div>
					Back
				</div>
				<div>
					To Map Website
				</div>
				<div
					className="map"
					id="MapContainer"
				/>
				<div>
					^
				</div>
				<InfoPanelComponent
					collapsed={false}
					sideList={[]}
					imgURL={this.state.targetDetails.storeFrontImgURL}
					targetDetails={this.state.targetDetails}
					product={this.props.store.value.selectedFoodItem}
					navigationMode={this.state.navigationType}
					eta={this.state.distance}
				/>
				<div
					className="options"
				/>
			</div>
		);
	}
}
