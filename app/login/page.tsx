import Image from 'next/image';
import FormLogin from './components/FormLogin';

export default function Login() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='border border-gray-700 p-12 mx-4 rounded-lg'>
        <div className='w-full items-center justify-center flex mb-6'>
          <Image
            src={'/btc.png'}
            alt={'btc'}
            width={100}
            height={100}
            className='w-[100px] h-[100px]'
            priority
          />
        </div>
        <FormLogin />
      </div>
    </div>
  );
}
