import "./UserCreateBox.scss";
import PostBox from "../CreatePostBox";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCreatePost } from "@/slide/AppSlide";

const UserCreateBox = ({}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { createPost } = useSelector((state) => state.app);
  const [add, setAdd] = useState(false);

  const handleClick = () => {
    dispatch(setCreatePost(true));
    setAdd(true);
  };
  return (
    <>
      <div className="user-create">
        <div className="avatar">
          <img
            src={
              user?.avatar
                ? user.avatar
                : "https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&rs=1&pid=ImgDetMain"
            }
            alt=""
            onClick={() => navigate("/profile")}
          />
        </div>
        <div className="text" onClick={handleClick}>
          Có gì mới?
        </div>
        <div className="btn" onClick={handleClick}>
          Đăng
        </div>
      </div>
      <hr />
      {add ? <PostBox /> : null}
    </>
  );
};

export default UserCreateBox;
