import React from "react";
import { useForm } from "react-hook-form";
import { rootUrl } from "../comps/api";
import axios from "axios";
function StationCreateForm(props) {
  const ourToken = localStorage.getItem("JWT");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const headers = {
      "Content-Type": "application/json",
      "user-jwt": ourToken,
    };
    console.log(data);
    axios
      .post(
        rootUrl + "stations",
        {
          name: data.name,
          comment: data.comment + "",
        },
        { headers: headers }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="stationFormContainer">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>New Station</h1>

        <input
          type="text"
          placeholder="Station Name"
          {...register("name")}
          required
        />

        <input
          type="comment"
          placeholder="Comment"
          {...register("comment")}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <div
        onClick={props.set}
        className="btn"
        style={{ backgroundColor: "gray", textAlign: "center" }}
      >
        Close
      </div>
    </div>
  );
}

export default StationCreateForm;
