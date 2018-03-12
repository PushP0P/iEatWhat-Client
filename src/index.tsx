// If Service Worker is supported then register
import { registerWorkers } from './registerServiceWorker';

// If Service Worker is supported then register
if ('serviceWorker' in navigator) {
	registerWorkers()
		.catch(err => console.log('Error registering SW', err));
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import { FIREBASE_CONFIG } from './configs/firebase.config';
import history from './router/router.history';
import { Router } from 'react-router';
import { StoreService } from './services/store.service';
import { MainComponent } from './components/main/main.component';
import { AuthServices } from './services/auth.service';
import { LocationService } from './services/location.service';
import './main.style.css';

firebase.initializeApp(FIREBASE_CONFIG);
// tslint:disable

// Launch ReactJS
ReactDOM.render(
	<Router
		history={history}
	>
		<MainComponent
			// This should be the only time StoreServices is constructed.
			location={new LocationService()}
			store={new StoreService()}
			auth={new AuthServices()}
		/>
	</Router>,
	document.getElementById('iEatWhat') as HTMLElement
);
