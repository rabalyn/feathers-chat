const app = require('../src/app');

let server;

before(async () => {
  server = app.listen(3333);
  
  await new Promise(resolve => server.once('listening', () => resolve()));
  await app.service('messages').query('DELETE from messages;');
  await app.service('users').query('DELETE from users;');
});

after(done => server.close(done));
