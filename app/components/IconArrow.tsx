export function IconArrowDown({
  color,
  isRotate,
}: {
  color?: string;
  isRotate?: boolean;
}) {
  return (
    <svg
      className={`transition-transform duration-400 ease-in-out ${
        isRotate ? 'rotate-180' : ''
      }`} // Conditional rotation
      width='17'
      height='16'
      viewBox='0 0 17 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.89 6L8.22331 10.6667L3.55664 6'
        stroke={color ?? '#3B4752'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default IconArrowDown;
