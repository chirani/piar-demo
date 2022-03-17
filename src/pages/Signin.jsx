import React from "react";
import { useForm } from "react-hook-form";
import { rootUrl } from "../comps/api";
import { UserContext } from "../context/Context";
import axios from "axios";

function Signin() {
  const { login } = React.useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const headers = {
    "Content-Type": "application/json",
  };
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(
        rootUrl + "users/auth",
        {
          login: data.email,
          password: data.password,
        },
        { headers: headers }
      )
      .then((response) => {
        console.log(response.data.user_jwt);
        login(response.data.user_jwt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in here</h1>

        <input
          tyoe="email"
          placeholder="Your email"
          {...register("email")}
          required
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
        <p>
          Don't have an account{" "}
          <a href="./signup">
            <span>Sign up</span>
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signin;
