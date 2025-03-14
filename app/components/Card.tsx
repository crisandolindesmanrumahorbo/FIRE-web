const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className='border border-gray-800 p-4 mx-4 rounded'>{children}</div>;
};

export default Card;
