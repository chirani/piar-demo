import React from "react";
import { UserContext } from "../context/Context";

import axios from "axios";

import { rootUrl } from "../comps/api";

const ourToken = localStorage.getItem("JWT");
function NavBar() {
  const [name, setname] = React.useState("");
  const config = {
    headers: { "user-jwt": ourToken, "Content-Type": "application/json" },
  };
  const { logged, logout, first } = React.useContext(UserContext);

  function GetnName_() {
    if (logged) {
      axios
        .get(rootUrl + "users/me", config)
        .then((res) => {
          console.log(res.data);

          console.log(res.data.name);
          setname(res.data.name);
        })
        .catch((error) => console.log(error));
    }
  }
  React.useEffect(() => {
    GetnName_();
  }, [logged]);

  return (
    <div className="navbar">
      <div className="navbar-container">
        {logged ? <h3>Hello {" " + name}</h3> : <p>logo</p>}
        {logged ? (
          <button onClick={() => (window.location.href = "/users")}>
            Users
          </button>
        ) : null}
        {logged ? (
          <button onClick={() => (window.location.href = "/")}>Location</button>
        ) : null}
        {logged ? <button onClick={() => logout()}>Log out</button> : null}
      </div>
    </div>
  );
}

export default NavBar;
