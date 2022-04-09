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
import { User } from "../lib/types";

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
    const userAvatar =
      localStorage.getItem("avatar") ||
      (Math.floor(Math.random() * 9) + 1).toString();
    setUser({ username: name, avatar: userAvatar });
  }, []);

  return (
    <UserContext.Provider value={user!}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
