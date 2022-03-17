import React from "react";
import { useForm } from "react-hook-form";
import { rootUrl } from "../comps/api";
import axios from "axios";
function Signup() {
  const { register, handleSubmit } = useForm();
  const headers = {
    "Content-Type": "application/json",
  };
  const onSubmit = (data) => {
    if (data.password === data.re_password) {
      console.log(data);
      axios
        .post(
          rootUrl + "users",
          {
            name: data.name,
            login: data.email,
            password: data.password,
            comment: data.comment,
          },
          { headers: headers }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("retype password correctly");
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up here</h1>
        <input
          tyoe="text"
          placeholder="Your name"
          {...register("name")}
          required
        />

        <input
          tyoe="email"
          placeholder="Your email"
          {...register("email")}
          required
        />

        <input tyoe="text" placeholder="any comment" {...register("comment")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          required
        />
        <input
          type="password"
          placeholder="Retype Password"
          {...register("re_password")}
          required
        />
        <button type="submit" className="btn">
          Submit
        </button>
        <p>
          If you're already have an account{" "}
          <a href="./signin">
            <span>Sign in</span>
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
