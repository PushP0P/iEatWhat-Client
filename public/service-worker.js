console.log('SW In Da Hizzy!!!', self);
self.addEventListener('fetched', (evt) => {
   console.log('worker hijacked fetch,', evt);
});
