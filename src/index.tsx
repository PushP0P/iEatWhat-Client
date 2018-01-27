import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router';
import { MainComponent } from './components/containers/main/main.component';
import history from './router/router.history';
import './index.css';

ReactDOM.render(
	<Router history={history}>
		<MainComponent/>
	</Router>,
	document.getElementById('iEatWhat') as HTMLElement
);
registerServiceWorker();
