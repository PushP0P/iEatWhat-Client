import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { MainComponent } from './components/main/main.component';
import history from './router/router.history';
import './main.style.css';
import { registerWorkers } from './registerServiceWorker';
import { StoreService } from './services/store.service';

// If Service Worker is supported then register
if ('serviceWorker' in navigator) {
	console.log('booting SW');
	registerWorkers()
		.catch(err => console.log('Error registering SW', err));
}

// Launch ReactJS
ReactDOM.render(
	<Router history={history}>
		<MainComponent
			store={new StoreService()}
		/>
	</Router>,
	document.getElementById('iEatWhat') as HTMLElement
);
