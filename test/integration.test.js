const assert = require('assert');
const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const authentication = require('@feathersjs/authentication-client');

describe('Socket.io integration tests', () => {
  const port = 3333;

  describe('integration test with authentication', () => {
    const socket = io(`http://localhost:${port}`);
    const client = feathers()
      .configure(socketio(socket))
      .configure(authentication());
    const userInfo = {
      email: 'integration@example.com',
      password: 'supersecret'
    };
    let user;

    before(async () => {
      await client.service('users').create(userInfo);
  
      const authResult = await client.authenticate({
        strategy: 'local',
        ...userInfo
      });
  
      user = authResult.user;
    });

    after(() => socket.disconnect());
  
    it('created and logged the user in', async () => {
      assert.ok(user);
    });

    it('can create a message and gets real-time event from feathers-sync', async () => {
      const createdEvent = new Promise(resolve =>
        client.service('messages').once('created', resolve)
      );
      client.service('messages').create({
        text: 'A message from the client'
      });

      const message = await createdEvent;

      assert.strictEqual(message.userId, user.id);
      assert.ok(message.createdAt);
    });
  });
});
