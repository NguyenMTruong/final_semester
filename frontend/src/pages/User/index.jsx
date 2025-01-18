import "./User.scss";
import { backendUrl } from "@/global";
import BackBTN from "@/components/BackBTN";
import UserContext from "@/components/UserContext";

import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const [data, setData] = useState(false);

  const { accessToken } = useSelector((state) => state.auth);

  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const username = param.get("username");

  useEffect(() => {
    axios
      .get(`${backendUrl}/users/${username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="username">
      <div className="head">
        <div className="left">
          <BackBTN />
        </div>
        <div className="midd">{username}</div>
        <div className="right"></div>
      </div>
      <div className="container">
        <div className="scroll">
          {data ? (
            <UserContext input={data} />
          ) : (
            <div className="load">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
