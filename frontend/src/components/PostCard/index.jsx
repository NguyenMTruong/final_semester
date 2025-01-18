import "./PostCard.scss";
import Action from "../ActionBTN";
import Image from "../Image";
import InfoMini from "../UserInfoMini";
import CreateComment from "../CreateComment";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { backendUrl } from "@/global";

const PostCard = ({ input, index, parentLoad }) => {
  const [data, setData] = useState(input);
  const { user, accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setData(input);
  }, [input]);

  const handleChange = (e) => {
    e.stopPropagation();
    if (data?.user?.username)
      if (data.user.username === user.username) navigate("/profile");
      else navigate(`/user?username=${data.user.username}`);
    else navigate("/login");
  };

  const reload = () => {
    axios
      .get(`${backendUrl}/posts/${data.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data);
        if (parentLoad) parentLoad();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="post-card"
      key={index}
      id={data.id}
      onClick={() => navigate(`/post?id=${data.id}`)}
    >
      <CreateComment input={data} parenReload={reload} />
      <div className="container">
        <div className="avatar">
          <img
            src={
              data?.user?.avatar
                ? data.user.avatar
                : "https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&rs=1&pid=ImgDetMain"
            }
            alt="Ảnh đại diện"
            onClick={handleChange}
          />
        </div>
        <div className="username">
          <div className="box" onClick={handleChange}>
            {data?.user?.username}
            <InfoMini input={data?.user} />
          </div>
        </div>
        <div className="content">
          <div className="tilte">{data?.content}</div>
          <div className="image">
            <Image input={data?.images} id={data.id} />
          </div>
          <div className="action-block">
            <Action input={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
