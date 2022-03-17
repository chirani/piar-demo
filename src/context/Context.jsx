import React, { createContext, useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [authState, setAuthState] = React.useState(
    localStorage.getItem("JWT") ? localStorage.getItem("JWT") : ""
  );
  const [first, setfirst] = React.useState(1);
  // Login updates the user data with a name parameter
  const login = (name) => {
    localStorage.setItem("JWT", name);
    setAuthState((authState) => setAuthState(name));
  };
  const firstUpdate = () => setfirst(first + 1);
  let logged = localStorage.getItem("JWT") ? true : null;
  // Logout updates the user data to default
  const logout = () => {
    localStorage.removeItem("JWT");
    setAuthState((authState) => setAuthState(""));
  };
  useEffect(() => {
    let logged = localStorage.getItem("JWT") ? true : null;
  }, [authState]);
  return (
    <UserContext.Provider value={{ login, logout, logged, first, firstUpdate }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
