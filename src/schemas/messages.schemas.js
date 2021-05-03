import { schema, resolver } from '@feathersjs/schema';

export const MessageSchema = schema({
  $id: 'message',
  properties: {
    text: { type: 'string' },
    userId: { type: 'number' }
  }
});

export const MessageData = resolver(MessageSchema, {
  userId (value, message, context) {
    return context.params.user?.id;
  }
});

export const MessageResult = resolver({
  user (value, message, context) {
    const { app, params } = context;

    return app.service('users').get(message.userId, params);
  }
});

export const MessageQuery = feathersQuery({
  properties: {}
});
