import * as React from 'react';
import { LOADING_INIT, LoadingComponentProps, LoadingComponentState } from '../../models/loading.model';

export const DotComponent = () => <span>.</span>;

export class LoadingComponent extends React.Component<LoadingComponentProps, LoadingComponentState> {
	public state: LoadingComponentState = LOADING_INIT;
	public interval: any;
	public limit = 10;
	public counter = 0;
	public backwards = false;

	public componentDidMount() {
		console.log('loading loading');
		this.interval = setInterval(
		() => {
			if (this.counter === this.limit) {
				this.backwards = true;
			}
			if (this.state.dots.length) {
				this.backwards = false;
			}
			this.backwards
				? this.setState({dots: this.state.dots.slice(0, this.counter)})
				: this.setState({dots: [...this.state.dots, <DotComponent key={this.counter.toString()}/>]});
			this.backwards
				? this.counter--
				: this.counter++;
			if (!this.props.visible) {
				clearInterval(this.interval);
			}
		},
		100);
	}

	public componentWillUnmount() {
		clearInterval(this.interval);
	}

	public render() {
		return(
			<div
				className="loading-component"
				style={{display: this.props.visible ? 'flex' : 'none'}}
			>
				<div
					className="animation-wrapper left"
				>
					<div
						className="text"
					>
						LOADING
					</div>
				</div>
				<div
					className="animation-wrapper right"
				>
					<span
						className="dots-box"
					>
						{this.state.dots}
					</span>
				</div>
			</div>
		);
	}
}
