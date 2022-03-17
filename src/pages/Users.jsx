import React, { useState } from "react";
import { UserContext } from "../context/Context";
import axios from "axios";
import StationForm from "../comps/StationCreateForm";
import { rootUrl } from "../comps/api";
import StationModify from "../comps/StationModifyUser";
const ourToken = localStorage.getItem("JWT");
function Home() {
  const { first } = React.useContext(UserContext);
  console.log(first);
  console.log(localStorage.getItem("JWT"));
  const [formActive, setformActive] = useState(false);

  const config = {
    headers: { "user-jwt": ourToken, "Content-Type": "application/json" },
  };
  const [stations, setStations] = useState([]);
  function GetStations_() {
    axios
      .get(rootUrl + "users", config)
      .then((res) => {
        console.log(res.data);
        setStations(res.data);
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    GetStations_();
  }, [first, formActive]);
  const AllCards = stations.map((a) => {
    return (
      <Card
        id={Number(a.id)}
        key={a.id}
        name={a.name}
        message={a.comment}
        login={a.login}
        set={() => {
          GetStations_();
        }}
      />
    );
  });

  return (
    <div>
      <div className="home-container">
        <button onClick={() => setformActive(true)}>Create New Station</button>
        {formActive ? (
          <StationForm
            set={() => {
              setformActive(false);
            }}
          />
        ) : null}
        {AllCards}
      </div>
    </div>
  );
}

export default Home;
function Card(props) {
  const [formActive, setformActive] = useState(false);
  const { firstUpdate } = React.useContext(UserContext);
  const onClickDelete_ = async (id) => {
    await axios
      .delete(rootUrl + "users/" + id, {
        headers: {
          "Content-Type": "application/json",
          "user-jwt": ourToken,
        },
        data: { id: id },
      })
      .then((res) => {
        console.log(res);
        firstUpdate();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      <div className="data">
        {formActive ? (
          <StationModify
            id={props.id}
            set={() => {
              setformActive(false);
              firstUpdate();
            }}
          />
        ) : null}
        <header>
          name: <span className="info">{props.name}</span>{" "}
        </header>
        <p>
          login: <span className="info">{props.login}</span>
        </p>
        <p>
          Message: <span className="info">{props.message}</span>
        </p>
      </div>
      <div className="actions">
        <button onClick={() => onClickDelete_(props.id, props.pump)}>
          Delete
        </button>
        <button onClick={() => setformActive(!formActive)}>Modify</button>
      </div>
    </div>
  );
}
