import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { MainComponent } from './components/main/main.component';
import history from './router/router.history';
import './main.style.css';
import { registerWorkers } from './registerServiceWorker';
import * as firebase from 'firebase';
import { handleSignedInUser, handleSignedOutUser } from './services/sign-in.service';
import { FIREBASE_CONFIG } from './configs/firebase.config';
import {Observable, Observer} from '@reactivex/rxjs';

// If Service Worker is supported then register
if ('serviceWorker' in navigator) {
	console.log('booting SW');
	registerWorkers()
		.catch(err => console.log('Error registering SW', err));
}

// Initialize FireBase and check for user session.


// Launch ReactJS
ReactDOM.render(
	<Router history={history}>
		<MainComponent/>
	</Router>,
	document.getElementById('iEatWhat') as HTMLElement
);
