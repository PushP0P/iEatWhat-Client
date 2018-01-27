import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router} from 'react-router';
import App from './components/containers/main/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
	<Router history={history}>
		<App/>
	</Router>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
