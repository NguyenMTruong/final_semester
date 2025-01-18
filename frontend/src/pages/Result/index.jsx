import { backendUrl } from "@/global";
import "./Result.scss";
import PostCard from "@/components/PostCard";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const query = param.get("query");

  const { accessToken } = useSelector((state) => state.auth);

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/posts/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="result-page">
      <div className="head">
        <div className="left"></div>
        <div className="midd">{query}</div>
        <div className="right"></div>
      </div>
      <div className="container">
        <div className="scroll">
          {!data ? (
            <div className="load">Loading ...</div>
          ) : (
            <>
              {data.map((d, ind) => (
                <PostCard input={d} index={ind} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
