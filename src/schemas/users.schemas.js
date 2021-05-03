import { schema, resolver } from '@feathersjs/schema';

// We need this to create the MD5 hash
import crypto from 'crypto';

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';

export const UserSchema = schema({
  $id: 'user',
  properties: {
    email: { type: 'string' },
    password: { type: 'number' },
    gravatar: { type: 'string' }
  }
});

export const UserData = resolver(UserSchema, {
  password (value) {
    return hashPassword(value);
  },

  gravatar (value, user) {
    // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
    const hash = crypto.createHash('md5').update(user.email.toLowerCase()).digest('hex');
    // Return the full avatar URL
    return `${gravatarUrl}/${hash}?${query}`;
  }
});

export const UserResult = resolver({
  password (value, user, context) {
    if (context.params.provider) {
      return undefined;
    }

    return value;
  }
});

export const UserQuery = feathersQuery({
  properties: {}
});
