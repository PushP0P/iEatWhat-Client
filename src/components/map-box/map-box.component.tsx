import * as React from 'react';
import { ReactElement } from 'react';
import { MAP_BOX_STATE_INIT , MapBoxComponentProps, MapBoxComponentState } from '../../models/components/map-box/map-box.model';
import { InfoPanelComponent } from './info-panel.controlled';
import  * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { MapComponent } from './map.component';
import { getDeviceLocation } from '../../services/map.service';
import { getPlaceData } from '../../services/map-box.service';
import { getStaticMap } from '../../services/map-box.service';
import { MapBoxLocation } from '../../models/components/map-box/map-box.model';
import { ModalComponent } from '../reusable/modal/modal.component';
import { MapProps } from '../../models/components/map-box/map.model';
import { Subscription } from '@reactivex/rxjs';
import { Observable } from '@reactivex/rxjs';
import { Observer } from '@reactivex/rxjs';
import { ModalControl } from '../../models/components/modal.model';
import { SyntheticEvent } from 'react';

export class MapBoxComponent extends React.Component<MapBoxComponentProps, MapBoxComponentState> {
	public state = MAP_BOX_STATE_INIT;
	private map: MapProps = {} as MapProps;
	private subscriptions: Subscription;

	constructor(public props: MapBoxComponentProps) {
		super(props);
		this.userResponseModalHandler = this.userResponseModalHandler.bind(this);
	}

	public async componentDidMount(): Promise<void> {
		this.subscriptions = Observable.create((observer: Observer<any>) => {
			onmousewheel = (evt: any) => {
				observer.next(evt.target.value);
				console.log('mouse wheel ', evt.target.value);
			}
		}).subscribe((res: any) => this.setState({
			wheelValue: res
		}));
		console.log('loaded map');

		this.map = new mapboxgl.Map({
			container: 'MapContainer',
			style: 'mapbox://styles/mapbox/light-v10'
		});

		// refactor getDLoc()
		const deviceLocation: MapBoxLocation | any = getDeviceLocation();
		if (deviceLocation) {
			this.setState({
				deviceLocation: deviceLocation
			});
		} else {
			this.setState({
				showModal: true
			});
		}

		this.placeSearchHandler();
	}

	public componentWillUnmount(){
		this.subscriptions.unsubscribe();
	}

	public render(): ReactElement<HTMLDivElement> {
		return (
			<div
				className="map-box-component"
			>
				<MapComponent
					{...this.state.mapData}
				/>
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
				<ModalComponent
					controls={[this.userInputControl]}
					visible={this.state.showModal}
				>

				</ModalComponent>
			</div>
		);
	}

	private userInputControl: ModalControl = {
			id: 'prompt',
			label: 'Please, provide a city for map to show.',
			onClick: this.userResponseModalHandler,
			style: '',
			classNames: ''
	};

	private userResponseModalHandler(evt: SyntheticEvent<HTMLDivElement>): void {

	}

	private updateMap(mapProps: MapProps) {

		const {lon, lat, zoom, bearing, pitch, mapsize, scale} = mapProps;
		this.setState({
			mapData: getStaticMap(lon, lat, zoom, bearing, pitch, [window.screenY, window.screenX], scale)
		})

	}

	private async placeSearchHandler(response: string): Promise<void> {
		const placeData: MapProps = await getPlaceData(response);
		await this.updateMap(placeData);
	}

}
