import React from "react";
interface contextType {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}
const defaultValue = {
  accessToken: "",
  setAccessToken: () => {},
};
const AuthContext = React.createContext<contextType>(defaultValue);
export default AuthContext;
