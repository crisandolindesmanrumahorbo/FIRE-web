'use client'

import useClickOutside from '@/app/hooks/useClickOutside';
import { ReactElement, useRef, useState } from 'react';
import { IExpiry } from '../transaction/buy/components/BuyForm';

const Dropdown = ({
  items,
  children,
  onChange,
}: {
  items: {
    label: string;
    value: string;
  }[];
  children: ReactElement;
  onChange: (value: IExpiry) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative group'>
      <button ref={buttonRef} onClick={handleClick} className='w-full h-full'>
        {children}
      </button>
      <div
        ref={dropdownRef}
        className={`absolute ${isOpen ? 'block' : 'hidden'} 
            bg-black right-0 left-auto w-48 min-w-max 
            rounded shadow-lg border border-gray-800 z-30
            max-h-[350px] overflow-y-auto`}
      >
        {items.map((item) => (
          <p
            onClick={() => {
              onChange(item);
              handleClick();
            }}
            key={item.value}
            className='cursor-pointer block px-4 py-2 hover:bg-gray-200 hover:text-black font-medium text-sm font-inter'
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
