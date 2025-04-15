'use client';
import Dropdown from '@/app/components/Dropdown';
import { useMarket, WebSocketReadyState } from '@/app/store/market';
import { useWsOrder } from '@/app/store/order';
import Avatar from './Avatar';
import { deleteToken } from '@/app/utils/cookies';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/app/theme/ThemeToggle';

export default function TopMenu() {
  const router = useRouter();
  const readyOrder = useWsOrder((state) => state.readyState);
  const readyMarket = useMarket((state) => state.readyState);
  return (
    <div className='sticky top-0 h-[60px]w-full'>
      <div className='flex justify-end mx-4 h-full items-center'>
        <div className='flex flex-col gap-1 mr-2'>
          <div className='relative'>
            {/* Dot */}
            <div
              className={`rounded-full ${
                readyOrder === WebSocketReadyState.OPEN
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } w-4 h-4 flex items-center justify-center text-white text-[10px] font-bold`}
            >
              O
            </div>
          </div>
          <div className='relative'>
            {/* Dot */}
            <div
              className={`rounded-full ${
                readyMarket === WebSocketReadyState.OPEN
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } w-4 h-4 flex items-center justify-center text-white text-[10px] font-bold`}
            >
              M
            </div>
          </div>
        </div>
        <div className='mx-2'>
        <ThemeToggle />
        </div>
        <Dropdown
          items={[{ label: 'Sign Out', value: 'Sign Out' }]}
          onChange={async () => {
            await deleteToken();
            router.push('/login');
          }}
        >
          <div className='mt-2'>
            <Avatar path='/btc.png' />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
