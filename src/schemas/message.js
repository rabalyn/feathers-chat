module.exports = {
  $id: 'message',
  type: 'object',
  properties: {
    text: {
      type: 'string',
      maxLength: 400
    },
    userId: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    }
  },
  additionalProperties: false
};
