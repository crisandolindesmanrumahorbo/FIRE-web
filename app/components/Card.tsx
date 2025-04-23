const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`border border-gray-800 p-4 mx-4 rounded ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
