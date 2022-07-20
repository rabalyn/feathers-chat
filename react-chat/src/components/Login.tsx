import React, { useState } from 'react';
import { client } from '../feathers'

export function Login () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onLogin = async () => {
    await client.authenticate({
      strategy: 'local',
      email,
      password
    })
  }
  const onSignup = async () => {
    await client.service('users').create({
      email,
      password
    })
    await onLogin()
  }

  return <div className='login flex min-h-screen bg-neutral justify-center items-center'>
    <div className='card w-full max-w-sm bg-base-100 px-4 py-8 shadow-xl'>
      <div className='px-4'><i className='h-32 w-32 block mx-auto i-logos-feathersjs invert'></i>
        <h1
          className='text-5xl font-bold text-center my-5 text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-900'>
          Feathers Chat
        </h1>
      </div>
      <form className='card-body pt-2'>
        <div className='alert alert-error justify-start'>
          <i className='i-feather-alert-triangle'></i>
          <span className='flex-grow'>API Error Message</span>
        </div>
        <div className='form-control'>
          <label htmlFor='email' className='label'><span className='label-text'>Email</span></label>
          <input onChange={ev => setEmail(ev.target.value)} type='text' name='email' placeholder='enter email' className='input input-bordered' />
        </div>
        <div className='form-control mt-0'>
          <label htmlFor='password' className='label'><span className='label-text'>Password</span></label>
          <input onChange={ev => setPassword(ev.target.value)} type='password' name='password' placeholder='enter password' className='input input-bordered' />
        </div>
        <div className='form-control mt-6'>
          <button onClick={onLogin} type='button' name='login' className='btn'>Login</button>
        </div>
        <div className='form-control mt-6'>
          <button onClick={onSignup} type='button' name='signup' className='btn'>Signup</button>
        </div>
      </form>
    </div>
    </div>;
}
