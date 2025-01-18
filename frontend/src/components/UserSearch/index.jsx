import "./UserSearch.scss";
import { backendUrl } from "@/global";
import InfoMini from "../UserInfoMini";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserSearch = ({ input }) => {
  const [data, setData] = useState(input);
  const [follow, setFollow] = useState(data?.follow);
  const { user, accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const reRender = () => {
    setFollow((prev) => !prev);
  };

  const handleChange = (e) => {
    e.stopPropagation();

    if (data?.username)
      if (data.username === user.username) navigate("/profile");
      else navigate(`/user?username=${data.username}`);
    else navigate("/login");
  };

  const handleFollow = (e) => {
    e.stopPropagation();
    axios
      .post(
        `${backendUrl}/users/follow/${data.username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setData(input);
  }, [input]);

  return (
    <div className="user-search">
      <div className="box">
        <div className="avatar">
          <img
            src={
              data?.avatar
                ? data.avatar
                : "https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&rs=1&pid=ImgDetMain"
            }
            alt=""
            onClick={handleChange}
          />
        </div>
        <div className="name">
          <div className="name-full" onClick={handleChange}>
            {data?.fullname}
            <InfoMini input={data} parentLoad={reRender} />
          </div>
          <div className="name-user">{data?.username}</div>
        </div>
        {data?.username != user.username ? (
          follow ? (
            <div className="btn follow" onClick={handleFollow}>
              Đang theo dõi
            </div>
          ) : (
            <div className="btn" onClick={handleFollow}>
              Theo dõi
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default UserSearch;
