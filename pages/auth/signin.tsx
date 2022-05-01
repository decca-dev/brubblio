import type { NextPageContext } from "next";
import { getProviders, signIn } from "next-auth/react";
import { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import Image from "next/image";
import { useEffect } from "react";
import { useMetaData } from "../../lib/hooks/useMetaData";

const SignIn = ({
  providers,
}: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>) => {
  let redirectUrl: string;
  useEffect(() => {
    redirectUrl = new URL(location.href).searchParams.get("callbackUrl")!;
  });
  return (
    <>
      {useMetaData("Sign in", "Sign in", "/auth/signin")}
      <div className="bg-black grid h-screen m-0 p-0 place-items-center w-screen">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <div className="p-5">
              <div className="container py-4">
                <div className="flex flex-col items-center content-center justify-center text-white font-bold text-lg">
                  <Image
                    src={"/assets/wide-logo.svg"}
                    width={300}
                    height={300}
                    className="animate-bounce mt-6"
                  ></Image>
                  <button
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: redirectUrl })
                    }
                    className="rounded px-9 py-1 bg-orange-500 transition-all duration-300 ease-in-out hover:bg-cyan-600 focus:bg-green-600"
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
