import Image from 'next/image';
import FormLogin from './components/FormLogin';
import Navbar from '../theme/Navbar';

export default function Login() {
  return (
    <>
      <Navbar />
      <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='border border-gray-700 p-12 mx-4 rounded-lg'>
          <div className='w-full items-center justify-center flex mb-6'>
            <div className='relative w-[100px] h-[100px]'>
              <Image
                src='/btc.png'
                alt='BTC Logo'
                fill
                className='object-contain'
              />
            </div>
          </div>
          <FormLogin />
        </div>
      </div>
    </>
  );
}
