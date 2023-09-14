import React from "react";
interface contextType {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
}
const defaultValue = {
  accessToken: "",
  setAccessToken: () => {},
  userRole: "",
  setUserRole: () => {},
};
const AuthContext = React.createContext<contextType>(defaultValue);
export default AuthContext;
