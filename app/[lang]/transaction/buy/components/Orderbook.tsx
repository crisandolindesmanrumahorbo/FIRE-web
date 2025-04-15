'use client';
import { useOrderBook } from '@/app/store/ordebook';
import SubscribeOrderbook from './SubscribeOrderbook';
import { useForm } from '@/app/store/order-form';
import { numberWithCommas } from '@/app/utils/number';

export default function Orderbook({ symbol }: { symbol: string }) {
  const data = useOrderBook((state) => state.orderbook);
  const setPrice = useForm((state) => state.setPrice);

  const onClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const value = e.currentTarget.textContent;
    if (value) {
      setPrice(+value);
    }
  };

  const bids = data?.bids.map((bid: number[]) => ({
    price: bid[0],
    type: 'bid',
    lot: bid[1],
    freq: 101,
  }));
  const asks = data?.asks.map((ask: number[]) => ({
    price: ask[0],
    type: 'ask',
    lot: ask[1],
    freq: 101,
  }));

  const orderbook = {
    bid: bids as Array<{
      price?: number;
      lot?: number;
      type: 'bid';
      freq?: number;
    }>,
    ask: asks as Array<{
      price?: number;
      lot?: number;
      type: 'ask';
      freq?: number;
    }>,
  };
  return (
    <SubscribeOrderbook symbol={symbol}>
      <div className='rounded-md overflow-hidden border border-gray-800 mx-4 mb-14'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='border border-gray-800'>
              {/* <th className='border border-gray-800'>Freq</th> */}
              <th className='border border-gray-800 w-[25%]'>Lot</th>
              <th className='border border-gray-800 w-[25%]'>Bid</th>
              <th className='border border-gray-800 w-[25%]'>Ask</th>
              <th className='border border-gray-800 w-[25%]'>Lot</th>
              {/* <th className='border border-gray-800'>Freq</th> */}
            </tr>
          </thead>
          <tbody>
            {asks?.map((_, i) => (
              <tr key={i} className='text-center border'>
                {/* <td className='border border-gray-800 text-purple-700'>
                  {orderbook.bid[i].freq}
                </td> */}
                <td className='border border-gray-800'>
                  {numberWithCommas(orderbook.bid[i].lot ?? 0)}
                </td>
                <td
                  className='border border-gray-800 text-red-700 cursor-pointer'
                  onClick={onClick}
                >
                  {numberWithCommas(orderbook.bid[i].price ?? 0)}
                </td>
                <td className='border border-gray-800 text-green-600'>
                  {numberWithCommas(orderbook.ask[i].price ?? 0)}
                </td>
                <td className='border border-gray-800'>
                  {numberWithCommas(orderbook.ask[i].lot ?? 0)}
                </td>
                {/* <td className='border border-gray-800 text-purple-700'>
                  {orderbook.ask[i].freq}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SubscribeOrderbook>
  );
}
