export async function registerWorkers(): Promise<void> {
	checkValidServiceWorker('./service-worker.js');
}

function registerValidSW(swUrl: string) {
	navigator.serviceWorker
		.register(swUrl)
		.then(registration => {
			console.log('hit', registration);
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker) {
					installingWorker.onstatechange = () => {
						if (installingWorker.state === 'installed') {
							if (navigator.serviceWorker.controller) {
								console.log('New content is available; please refresh.');
							} else {
								console.log('Content is cached for offline use.');
							}
						}
					};
				}
			};
		})
		.catch(error => {
			console.log('Error during service worker registration:', error);
		});
}

function checkValidServiceWorker(swUrl: string) {
	// Check if the service worker can be found. If it can't reload the page.
	fetch(swUrl)
		.then(response => {
			// Ensure service worker exists, and that we really are getting a JS file.
			if (
				response.status === 404 ||
				response.headers.get('content-type')!.indexOf('javascript') === -1
			) {
				// No service worker found. Probably a different app. Reload the page.
				navigator.serviceWorker.ready.then(registration => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else {
				// Service worker found. Proceed as normal.
				registerValidSW(swUrl);
			}
		})
		.catch(() => {
			console.log(
				'No internet connection found. App is running in offline mode.'
			);
		});
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then(registration => {
			registration.unregister();
		});
	}
}
