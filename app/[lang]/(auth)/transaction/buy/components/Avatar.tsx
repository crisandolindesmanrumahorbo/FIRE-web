import Image from "next/image";

const Avatar = ({ path }: { path: string }) => {
  return (
    <Image
      src={path}
      alt={path}
      width={40}
      height={40}
      className="w-[40px] h-[40px] min-w-[40px] min-h-[40px]"
    />
  );
};

export default Avatar;
