import { backendUrl } from "@/global";
import "./Activity.scss";
import PostCard from "@/components/PostCard";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Activity = () => {
  const [data, setData] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${backendUrl}/users/active`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="activity-page">
      <div className="head">
        <div className="left"></div>
        <div className="midd">Hoạt động</div>
        <div className="right"></div>
      </div>
      <div className="container">
        <div className="scroll">
          {data ? (
            <>
              {data.map((d, index) => (
                <PostCard input={d} index={index} />
              ))}
            </>
          ) : (
            <div className="load">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
