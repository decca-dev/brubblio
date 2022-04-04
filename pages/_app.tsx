import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { useEffect, useState } from "react";
import UserContext from "../components/contexts/UserContext";
interface User {
  username: string;
  avatar: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const name =
      localStorage.getItem("username") ||
      uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2,
        separator: " ",
      });
    const userAvatar = localStorage.getItem("avatar") || "1";
    setUser({ username: name, avatar: userAvatar });
  }, []);

  return (
    <UserContext.Provider value={user!}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
