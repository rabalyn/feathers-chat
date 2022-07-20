import React, { useState, useEffect } from 'react';
import { Chat } from './components/Chat';

import { Login } from './components/Login';
import { client } from './feathers';

function App() {
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    client.reAuthenticate();
  }, []);

  useEffect(() => {
    client.once('login', ({ user }: any) => setUser(user));
    client.once('logout', () => setUser(null));
  }, [user]);

  return (
    <div className='App'>
      {user ? <Chat /> : <Login />}
    </div>
  );
}

export default App;
