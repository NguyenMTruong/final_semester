import "./InfoMini.scss";
import { backendUrl } from "@/global";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InfoMini = ({ input, parentLoad = () => {} }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [data, setData] = useState(input);

  useEffect(() => {
    setData(input);
  }, [input]);

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
        console.log(res);
        setData(res.data);
        parentLoad();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="info-mini">
      <div className="container">
        <div className="first">
          <div className="left">
            <div className="fullname">{data?.fullname}</div>
            <div className="username">{data?.username}</div>
          </div>
          <div className="right">
            <img
              src={
                data?.avatar
                  ? data.avatar
                  : "https://th.bing.com/th/id/OIP.kQyrx9VbuWXWxCVxoreXOgHaHN?rs=1&pid=ImgDetMain"
              }
              alt=""
            />
          </div>
        </div>
        <div className="second">
          <div className="title">{data?.title}</div>
          <div className="follow">
            {data?.follows ? data.follows : 0} người theo dõi
          </div>
        </div>
        <div className="btn" onClick={handleFollow}>
          {data?.follow ? (
            <div className="follow">
              <div className="box">Đang theo dõi</div>
            </div>
          ) : (
            <div className="unfollow">
              {" "}
              <div className="box">Theo dõi</div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoMini;
