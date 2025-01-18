import "./Home.scss";
import { backendUrl } from "@/global";
import UserCreateBox from "@/components/UserCreateBox";
import PostCard from "@/components/PostCard";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const { isLogin, user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${backendUrl}/posts?username=${user?.username}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-page">
      <div className="head">
        <div className="left"></div>
        <div className="midd">Trang chủ</div>
        <div className="right"></div>
      </div>
      <div className="container">
        <div className="scroll">
          <div className="post-list">
            {isLogin ? <UserCreateBox /> : null}
            {!data ? (
              <div>Loading ...</div>
            ) : (
              data.map((d, index) => <PostCard input={d} index={index} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
