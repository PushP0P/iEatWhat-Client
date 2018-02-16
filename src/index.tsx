// If Service Worker is supported then register
import { registerWorkers } from './registerServiceWorker';

// If Service Worker is supported then register
if ('serviceWorker' in navigator) {
	registerWorkers()
		.catch(err => console.log('Error registering SW', err));
}

import * as firebase from 'firebase';
import { handleSignedInUser, handleSignedOutUser } from './services/sign-in.service';
import { FIREBASE_CONFIG } from './configs/firebase.config';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { StoreService } from './services/store.service';
import { MainComponent } from './components/main/main.component';

// Initialize FireBase and check for user session.
firebase.initializeApp(FIREBASE_CONFIG);
firebase.auth().onAuthStateChanged((user: any) => {
	user ? handleSignedInUser(user) : handleSignedOutUser();
});

// Launch ReactJS
ReactDOM.render(
	<Router
		history={history}
	>
		<MainComponent
			store={new StoreService()}
		/>
	</Router>,
	document.getElementById('iEatWhat') as HTMLElement
);
