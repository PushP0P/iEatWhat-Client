import * as React from 'react';
import { ReactElement } from 'react';
import {
	MAP_BOX_STATE_INIT , MapBoxComponentProps,
	MapBoxComponentState
} from '../../models/components/map-box/map-box.model';
import { MapProps } from '../../models/components/map-box/map.model';
import { Subscription } from '@reactivex/rxjs';
import { Observable } from '@reactivex/rxjs';
import { Observer } from '@reactivex/rxjs';
import { ModalControl } from '../../models/components/modal.model';
import { SyntheticEvent } from 'react';
import { MasterState } from '../../services/store.service';
import { InfoPanelComponent } from './info-panel.controlled';
import { MapComponent } from './map.component';
import { getDeviceLocation } from '../../services/location.service';
import { getPlaceData } from '../../services/map-box.service';
import { ModalComponent } from '../reusable/modal/modal.component';
import { getStaticMap } from '../../services/map-box.service';
import { mapActionUpdate } from './map-box.actions';
import { mapBoxReducer } from './map-box.reducer';

export class MapBoxComponent extends React.Component<MapBoxComponentProps, MapBoxComponentState> {
	public state: MapBoxComponentState = MAP_BOX_STATE_INIT;
	private subscriptions: Subscription;
	private locationModel: string = '';
	private userInputControl: ModalControl = {
		id: 'prompt',
		label: 'Please, provide a city for map to show.',
		onClick: this.userResponseModalHandler,
		style: '',
		classNames: ''
	};

	constructor(public props: MapBoxComponentProps) {
		super(props);
		this.userResponseModalHandler = this.userResponseModalHandler.bind(this);
	}

	public async componentDidMount(): Promise<void> {

		this.subscriptions = Observable.create((observer: Observer<any>) => {
			onmousewheel = (evt: MouseEvent) => {
				observer.next((evt.target as any).value);
			};
			onerror = (evt: string) => {
				observer.error(evt);
			};
		}).subscribe((state: any) => this.setState({
			wheelValue: state
		}));
		this.subscriptions.add(this.props.store
			.registerStore$(mapBoxReducer, MAP_BOX_STATE_INIT)
			.subscribe((state: MasterState) => this.setState(this.state)));
		const location = await getDeviceLocation();
		if (location) {
			this.props.store.dispatch(mapActionUpdate({
				deviceLocation: location
			}));
		} else {
			await this.showPlaceSearch();
		}
	}

	public componentWillUnmount() {
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
					<input
						onChange={(evt) => this.locationModel = evt.target.value}
					/>
				</ModalComponent>
			</div>
		);
	}

	private async userResponseModalHandler(evt: SyntheticEvent<HTMLDivElement>): Promise<void> {
		this.props.store.dispatch(
			mapActionUpdate(
				{
					deviceLocation: this.locationModel,
					showModal: false
				}
			)
		);
	}

	private async showPlaceSearch(): Promise<void> {
		const placeData: MapProps = await getPlaceData(this.locationModel);
		const {lon, lat, zoom, bearing, pitch} = placeData;

		// fix any

		const mapData: any = await getStaticMap(lon, lat, zoom, bearing, pitch);
		console.log('mao data', mapData);
		this.props.store.dispatch(mapActionUpdate({mapData: mapData}));
	}
}
