// If Service Worker is supported then register
import { registerWorkers } from './registerServiceWorker';

// If Service Worker is supported then register
if ('serviceWorker' in navigator) {
	registerWorkers()
		.catch(err => console.log('Error registering SW', err));
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { StoreService } from './services/store.service';
import { MainComponent } from './components/main/main.component';

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
