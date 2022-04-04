import { createContext } from "react";

interface User {
  username: string;
  avatar: string;
}

const UserContext = createContext<User>({
  username: "",
  avatar: "",
});

export default UserContext;
