import { backendUrl } from "@/global";
import "./Comment.scss";
import CommentCard from "@/components/CommentCard";
import BackBTN from "@/components/BackBTN";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Comment = () => {
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const id = param.get("id");

  const [data, setData] = useState(null);
  console.log(data);

  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${backendUrl}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="comment">
      <div className="head">
        <div className="left">
          <BackBTN />
        </div>
        <div className="midd">Bình luận</div>
        <div className="right"></div>
      </div>
      <div className="container">
        <div className="scroll">
          {data ? (
            <>
              <CommentCard input={data} index={0} />
              <hr />
              <div className="box">
                <div className="left">
                  {data?.comments?.length > 0 ? "Các bình luận" : null}
                </div>
                <div className="right">
                  Xem hoạt động &gt;
                  <div className="submenu">
                    <div className="div">{data?.likes} lượt thích</div>
                    <hr />
                    <div className="div">
                      {data?.comments.length} lượt bình luận
                    </div>
                    <hr />
                    <div className="div">
                      {data?.reposts ? data.reposts : 0} lượt đăng lại
                    </div>
                    <hr />
                    <div className="div">
                      {data?.shares ? data.shares : 0} lượt chia sẻ
                    </div>
                  </div>
                </div>
              </div>
              {data?.comments ? (
                <>
                  <hr />
                  {data?.comments.map((d, index) => (
                    <CommentCard input={d} index={index} />
                  ))}
                </>
              ) : null}
            </>
          ) : (
            <div className="load">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
