import React from "react";
interface contextType {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  products: string[];
  setProducts: React.Dispatch<React.SetStateAction<string[]>>;
  totalCost: number;
  setTotalCost: React.Dispatch<React.SetStateAction<number>>;
}
const defaultValue = {
  accessToken: "",
  setAccessToken: () => {},
  userRole: "",
  setUserRole: () => {},
  products: [],
  setProducts: () => {},
  totalCost: 0,
  setTotalCost: () => {},
};
const AuthContext = React.createContext<contextType>(defaultValue);
export default AuthContext;
