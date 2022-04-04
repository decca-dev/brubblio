import Image from "next/image";

interface HeaderOptions {
  title: string;
}

const Header = ({ title }: HeaderOptions) => {
  return (
    <header className="flex flex-col items-center text-center">
      <Image src="/assets/wide-logo.svg" width={350} height={150} />
      <h1 className="text-white text-3xl mb-10">{title}</h1>
    </header>
  );
};

export default Header;
