module.exports = {
  $id: 'user',
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    }
  },
  additionalProperties: false
};
