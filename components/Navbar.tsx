import Image from "next/image";
import { useSession, signIn } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav dir="rtl">
      {session && (
        <div dir="rtl" className="w-40 h-16 bg-white rounded-xl text-center">
          <h1 className="inline-block align-middle font-bold text-xl">
            {session.user?.name}
          </h1>
          <div className="inline-block align-middle">
            <Image
              src={`/assets/avatars/${
                localStorage.getItem("avatar") ||
                (Math.floor(Math.random() * 8) + 1).toString()
              }.svg`}
              width={50}
              height={50}
            />
          </div>
        </div>
      )}
      {!session && (
        <div dir="rtl">
          <Image
            src={`/assets/avatars/${
              localStorage.getItem("avatar") ||
              (Math.floor(Math.random() * 8) + 1).toString()
            }.svg`}
            width={10}
            height={10}
          />
          <button
            className="bg-yellow-500 w-28 h-10 rounded-xl font-bold text-white hover:scale-95 hover:-translate-y-1 transition-all delay-100 duration-200 ease-in-out"
            onClick={() => signIn()}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
