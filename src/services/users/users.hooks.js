const { authenticate } = require('@feathersjs/authentication').hooks;

const AJV = require('ajv');
const { validateSchema } = require('feathers-hooks-common');
const userSchema = require('../../schemas/user');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword('password'),
      validateSchema(userSchema, AJV)
    ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [
      hashPassword('password'), 
      authenticate('jwt'),
      validateSchema(userSchema, AJV)
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
