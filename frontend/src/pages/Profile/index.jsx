import "./Profile.scss";
import { backendUrl } from "@/global";
import UserContext from "@/components/UserContext";

import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef, act } from "react";

const Profile = () => {
  const imageRef = useRef(null);
  const [data, setData] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const { accessToken, user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${backendUrl}/users/${user.username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setTitle(res.data?.title);
        setFullname(res.data.fullname);
        setUsername(res.data.username);
        setAvatar(res.data.avatar);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    if (!username) return;
    if (!fullname) return;

    console.log(title);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("title", title);
    formData.append("avatar", file);

    axios
      .put(`${backendUrl}/users`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        document.querySelector(".profile .change-info").style.display = "none";
        setData(res.data);
        setTitle(res.data.title);
        setFullname(res.data.fullname);
        setUsername(res.data.username);
        setAvatar(res.data.avatar);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile">
      <div className="head">
        <div className="left"></div>
        <div className="midd">Trang cá nhân</div>
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
      <div
        className="change-info"
        onClick={(e) => {
          setTitle(data?.title);
          setFullname(data?.fullname);
          setUsername(data?.username);
          setAvatar(data?.avatar);
          e.target.style.display = "none";
        }}
      >
        <div className="box" onClick={(e) => e.stopPropagation()}>
          <div className="info">
            <div className="name">
              <div className="name-full">
                <div className="text">Tên đầy đủ: </div>
                <input
                  type="text"
                  placeholder="Tên đầy đủ"
                  defaultValue={fullname}
                />
              </div>
              <div className="name-user">
                <div className="text">Username: </div>
                <input
                  type="text"
                  placeholder="Username"
                  defaultValue={username}
                />
              </div>
            </div>
            <div className="avatar">
              <img
                src={
                  avatar
                    ? avatar
                    : "https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&rs=1&pid=ImgDetMain"
                }
                alt=""
                onClick={() => imageRef.current.click()}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={imageRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  const image = URL.createObjectURL(file);
                  setFile(file);
                  setAvatar(image);
                }}
              />
            </div>
          </div>
          <div className="title">
            <div>Tiểu sử</div>
            <input
              type="text"
              placeholder="Viết tiểu sử của bạn"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="btn" onClick={handleSubmit}>
            <div className="box">Xong</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
