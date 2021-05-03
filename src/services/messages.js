import { hooks } from '@feathersjs/hooks';
import { Service } from 'feathers-nedb';

export class MessagesService extends Service {
  
}

hooks(MessagesService.prototype, [
  authenticate('jwt')  
]);

hooks(MessageService, {
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
});

export function messages (app) {
  app.use('messages', new MessagesService());
}
