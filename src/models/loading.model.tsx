import * as React from 'react';
import { DotComponent } from '../components/loading/loading.component';

export interface LoadingComponentProps {
	visible: boolean;
}

export interface LoadingComponentState {
	dots: {}[];
}

export const LOADING_INIT = {
	visible: false,
	dots: [<DotComponent key={'one'}/>, <DotComponent key={'two'}/>, <DotComponent key={'three'}/>]
};
