import { numberWithCommas } from "@/app/utils/number";

const Input = ({
  step,
  value,
  setValue,
}: {
  defaultValue?: number;
  step: number;
  value: number;
  setValue: (param: number) => void;
}) => {
  const addStep = () => {
    setValue(value + step);
  };
  const minusStep = () => {
    setValue(value - step);
  };
  const handleChange = (value: string) => {
    const NUMBER_ONLY = /\D/g;
    const inputValue = String(value).replaceAll(NUMBER_ONLY, "");
    setValue(Number(inputValue));
  };

  return (
    <div className="flex gap-2">
      <button
        className="cursor-pointer border px-2 rounded border-gray-800 items-center"
        onClick={() => minusStep()}
      >
        -
      </button>
      <div>
        <input
          className="text-center max-w-[100px] min-w-[80px]"
          type="text"
          value={numberWithCommas(value)}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <button
        className="cursor-pointer border px-2 rounded border-gray-800 items-center"
        onClick={() => addStep()}
      >
        +
      </button>
    </div>
  );
};

export default Input;
