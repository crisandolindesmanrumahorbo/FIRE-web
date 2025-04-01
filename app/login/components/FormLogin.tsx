'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '../../components/Input';
import { initCookies } from '../../utils/cookies';
import { login } from '../service';

export default function FormLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onLogin = async () => {
    if (!username || !password) {
      setMessage('Username and password are required');
      return;
    }
    const { data, error } = await login(username, password);
    if (error) {
      setMessage(error);
      return;
    }
    await initCookies({ token: data.token });
    router.push('/transaction/buy/ETHUSD');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
    >
      <div className='md:w-[60vh] flex flex-col gap-1'>
        <Input
          inputMode='text'
          value={username}
          onChange={(value: string) => {
            setUsername(value?.trim());
            setMessage('');
          }}
          isError={message.length > 0}
          label={'Username'}
        />
        <Input
          inputMode='password'
          value={password}
          onChange={(value: string) => {
            setPassword(value);
            setMessage('');
          }}
          isError={message.length > 0}
          label={'Password'}
        />
      </div>
      <p className='text-red-400'>{message}</p>

      <button
        className='font-semibold bg-green-800 px-2 py-2 w-full rounded mt-4 cursor-pointer hover:bg-white hover:text-green-800 border border-green-800  hover:outline-white'
        type='submit'
      >
        Login
      </button>
    </form>
  );
}
