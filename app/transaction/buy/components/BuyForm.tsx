'use client';
import { useForm } from '@/app/store/order-form';
import { useEffect, useState } from 'react';
import Card from '../../../components/Card';
import Dropdown from '../../../components/Dropdown';
import IconArrowDown from '../../../components/IconArrow';
import Input from '../../../components/InputPrice';
import RangeSlider from '../../../components/RangeSlider';
import { numberWithCommas } from '@/app/utils/number';

export interface IExpiry {
  value: string;
  label: string;
}

export const EXPIRY = [
  { value: 'GFD', label: 'Good For Day' },
  { value: 'GTC', label: 'Good Till Cancelled' },
];

export default function BuyForm({}: { symbol?: string }) {
  const tradingBalance = 3262364;
  const price = useForm((state) => state.price);
  const lot = useForm((state) => state.lot);
  const expiry = useForm((state) => state.expiry);
  const setPrice = useForm((state) => state.setPrice);
  const setLot = useForm((state) => state.setLot);
  const setExpiry = useForm((state) => state.setExpiry);
  const priceShares = price * 100;
  const investment = lot * priceShares;
  const [slider, setSlider] = useState(0);

  // Handle change and force snapping to step
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      Math.round(Number(e.target.value) / priceShares) * priceShares; // Snap to step
    const lot = newValue / priceShares;
    setSlider(newValue);
    setLot(lot);
  };

  useEffect(() => {
    const slider = lot * priceShares;
    setSlider(slider);
  }, [lot, priceShares]);

  const handleExpiryChange = (item: IExpiry) => {
    setExpiry(item);
  };
  return (
    <Card>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <p>Trading Balance</p>
          <p>{`$ ${numberWithCommas(tradingBalance)}`}</p>
        </div>
        <div className='my-4'>
          <RangeSlider
            value={slider}
            max={tradingBalance}
            step={priceShares}
            handleChange={handleChange}
          />
        </div>

        <div className='flex justify-between items-center'>
          <p>Investment</p>
          <p>{`$ ${numberWithCommas(investment)}`}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p>Price</p>
          <Input step={100} value={price} setValue={setPrice} />
        </div>
        <div className='flex justify-between items-center'>
          <p>Lot</p>
          <Input step={1} value={lot} setValue={setLot} />
        </div>
        <div className='flex justify-between items-center'>
          <p>Expiry</p>
          <Dropdown items={EXPIRY} onChange={handleExpiryChange}>
            <div className='border p-2 w-[180px] rounded border-gray-800'>
              <div className='flex justify-between'>
                <p className='text-xs'>{expiry.label}</p>
                <IconArrowDown />
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </Card>
  );
}
