import "./UserContext.scss";
import PostCard from "../PostCard";
import UserCreateBox from "../UserCreateBox";

import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { backendUrl } from "@/global";

const UserContext = ({ input }) => {
  const [user2, setUser] = useState(input);
  const [data, setData] = useState(null);
  const [type, setType] = useState("post");
  const [load, setLoad] = useState(true);
  const { user, accessToken } = useSelector((state) => state.auth);

  const handleClick = (e) => {
    const newType = e.target.dataset.type;
    if (newType == type) return;
    setLoad(true);
    axios
      .get(`${backendUrl}/users/${newType}/${user2.username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setLoad(false);
        setData(res.data.reverse());
      })
      .catch((err) => console.log(err));
    setType(newType);
  };

  useEffect(() => {
    setUser(input);
  }, [input]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/users/post/${user2.username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setLoad(false);
        setData(res.data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = (e) => {
    e.stopPropagation();
    axios
      .post(
        `${backendUrl}/users/follow/${user2.username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-context">
      <div className="user-info">
        <div className="info">
          <div className="name">
            <div className="name-full">{user2?.fullname}</div>
            <div className="name-user">{user2?.username}</div>
          </div>
          <div className="avatar">
            <img
              src={
                data?.avatar
                  ? data.avatar
                  : "https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&rs=1&pid=ImgDetMain"
              }
              alt=""
            />
          </div>
        </div>
        <div className="title">{user2?.title}</div>
        <div className="follow">
          {user2?.follows ? user2.follows : 0} người theo dõi
        </div>
        {user2?.username == user.username ? (
          <div
            className="btn"
            onClick={() =>
              (document.querySelector(".profile .change-info").style.display =
                "flex")
            }
          >
            Chỉnh sửa trang cá nhân
          </div>
        ) : user2.follow ? (
          <div onClick={handleFollow} className="btn follow">
            Đang theo dõi
          </div>
        ) : (
          <div onClick={handleFollow} className="btn unfollow">
            Theo dõi
          </div>
        )}
      </div>
      <div className="content">
        <div className="subnav">
          <div
            className={type == "post" ? "btn active" : "btn"}
            onClick={handleClick}
            data-type="post"
          >
            Bài viết
          </div>
          <div
            className={type == "comment" ? "btn active" : "btn"}
            onClick={handleClick}
            data-type="comment"
          >
            Bình luận
          </div>
          <div
            className={type == "repost" ? "btn active" : "btn"}
            onClick={handleClick}
            data-type="repost"
          >
            Bài đăng lại
          </div>
        </div>
        {!load ? (
          <div className="box">
            {type == "post" && user2?.username == user?.username ? (
              <UserCreateBox />
            ) : null}
            {data.length > 0 ? (
              <>
                {data.map((d, index) => (
                  <PostCard input={d} index={index} />
                ))}
              </>
            ) : (
              <div>Chẳng có gì ở đây</div>
            )}
          </div>
        ) : (
          <div className="load">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default UserContext;
