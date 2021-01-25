const { authenticate } = require('@feathersjs/authentication').hooks;

const AJV = require('ajv');
const { validateSchema } = require('feathers-hooks-common');
const messageSchema = require('../../schemas/message');

const processMessage = require('../../hooks/process-message');
const populateUser = require('../../hooks/populate-user');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      processMessage(),
      validateSchema(messageSchema, AJV)
    ],
    update: [],
    patch: [
      validateSchema(messageSchema, AJV)
    ],
    remove: []
  },

  after: {
    all: [populateUser()],
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
