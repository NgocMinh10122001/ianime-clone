// import { AuthProvider } from '@/components/context/AuthProvider';
"use client";

// import { createContext, useContext, useState } from "react";
// interface IContext {
//   isToggleMenuUser: boolean;
//   isToggleSubMenu: boolean;
//   setToggleSubMenu: Function;
//   setToggleMenuUser: Function;
// }
// export const AppContext = createContext<IContext | {}>({});

// export const useTheme = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };

// export default function AppProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   let [isToggleSubMenu, setToggleSubMenu] = useState(false);
//   let [isToggleMenuUser, setToggleMenuUser] = useState(false);
//   return (
//     <AppContext.Provider
//       value={{
//         isToggleMenuUser,
//         isToggleSubMenu,
//         setToggleSubMenu,
//         setToggleMenuUser,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

import React, { createContext, useCallback, useContext, useState } from "react";

// Define the shape of your context
interface ISetStateToggleMenu {
  // theme: string;
  // toggleTheme: () => void;
  isToggleMenuUser: boolean;
  isToggleSubMenu: boolean;
  setToggleSubMenu: Function;
  setToggleMenuUser: Function;
  handleToggleSubMenu: () => void;
  toggleMenuUser: () => void;
}

// Create the context
const AppContext = createContext<ISetStateToggleMenu | undefined>(undefined);

// Create a custom hook to access the context
export const useTheme = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Create a provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const [theme, setTheme] = useState("light");
  const [isToggleSubMenu, setToggleSubMenu] = useState(false);
  const [isToggleMenuUser, setToggleMenuUser] = useState(false);
  const handleToggleSubMenu = useCallback(() => {
    setToggleSubMenu(!isToggleSubMenu);
  }, [isToggleSubMenu]);
  const toggleMenuUser = useCallback(() => {
    setToggleMenuUser(!isToggleMenuUser);
  }, [isToggleMenuUser]);
  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };

  return (
    <AppContext.Provider
      value={{
        isToggleMenuUser,
        isToggleSubMenu,
        setToggleSubMenu,
        setToggleMenuUser,
        handleToggleSubMenu,
        toggleMenuUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
