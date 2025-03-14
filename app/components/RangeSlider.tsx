const RangeSlider = ({
  min = 0,
  max,
  handleChange,
  value,
}: {
  min?: number;
  max: number;
  step?: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
}) => {
  return (
    <div className='w-full mx-auto flex gap-2'>
      {/* Slider Wrapper */}
      <div className='relative w-full'>
        {/* Input Slider */}
        <input
          type='range'
          min={min}
          max={max}
          //   step={step}
          value={value}
          onChange={handleChange}
          className='w-full h-3 appearance-none cursor-pointer bg-transparent absolute top-0 left-0 z-20 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md 
              [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 
              [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md 
              [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-400 mt-1'
        />

        {/* Background Track (Grey) */}
        <div className='absolute top-1/2 left-0 w-full h-3 bg-gray-300 rounded-lg -translate-y-1/2'></div>

        {/* Progress Bar (Green) */}
        <div
          className='absolute top-1/2 left-0 h-3 bg-[#00A367] rounded-lg -translate-y-1/2'
          style={{
            width: `${(value / max) * 100 <= 100 ? (value / max) * 100 : 100}%`,
          }}
        />
      </div>

      {/* Percentage Display */}
      <div className='text-sm font-semibold w-[36px] text-right'>
        {Math.round((value / max) * 100)}%
      </div>
    </div>
  );
};

export default RangeSlider;
