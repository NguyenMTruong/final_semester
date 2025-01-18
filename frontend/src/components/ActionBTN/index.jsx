import "./Action.scss";
import { backendUrl } from "@/global";

import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Action = ({ input, type = "posts" }) => {
  const [data, setData] = useState(input);
  const { accessToken, user } = useSelector((state) => state.auth);

  const handleActionCLick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    switch (e.target.dataset.type) {
      case "like":
        axios
          .post(`${backendUrl}/${type}/like/${data.id}`, user?.username, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res);

            setData(res.data);
          })
          .catch((err) => console.log(err));
        break;
      case "repost":
        axios
          .post(`${backendUrl}/${type}/repost/${data.id}`, user?.username, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
        break;
      case "comment":
        document.querySelector(
          `.create-comment[data-id="${data.id}"]`
        ).style.display = "flex";
        break;
      default:
        console.log("share");
        break;
    }
  };

  return (
    <>
      <div className="action">
        <div className="action-btn">
          <div
            className="box"
            style={{
              color: data?.like ? "var(--dark-color)" : "var(--dark-overlay)",
            }}
          >
            <svg
              aria-label="Thích"
              role="img"
              viewBox="0 0 18 18"
              style={{
                "--fill": data?.like ? "currentcolor" : "transparent",
                "--height": "19px",
                "--width": "18.75px",
              }}
            >
              <title>Thích</title>
              <path
                d="M1.34375 7.53125L1.34375 7.54043C1.34374 8.04211 1.34372 8.76295 1.6611 9.65585C1.9795 10.5516 2.60026 11.5779 3.77681 12.7544C5.59273 14.5704 7.58105 16.0215 8.33387 16.5497C8.73525 16.8313 9.26573 16.8313 9.66705 16.5496C10.4197 16.0213 12.4074 14.5703 14.2232 12.7544C15.3997 11.5779 16.0205 10.5516 16.3389 9.65585C16.6563 8.76296 16.6563 8.04211 16.6562 7.54043V7.53125C16.6562 5.23466 15.0849 3.25 12.6562 3.25C11.5214 3.25 10.6433 3.78244 9.99228 4.45476C9.59009 4.87012 9.26356 5.3491 9 5.81533C8.73645 5.3491 8.40991 4.87012 8.00772 4.45476C7.35672 3.78244 6.47861 3.25 5.34375 3.25C2.9151 3.25 1.34375 5.23466 1.34375 7.53125Z"
                strokeWidth="1.25"
              ></path>
            </svg>
            <div>{data?.likes ? data.likes : null}</div>
            <div
              onClick={handleActionCLick}
              className="click"
              data-type="like"
            ></div>
          </div>
        </div>
        <div className="action-btn">
          <div className="box">
            <svg
              aria-label="Trả lời"
              role="img"
              viewBox="0 0 18 18"
              style={{
                "--fill": "transparent",
                "--height": "18px",
                "--width": "18px",
              }}
            >
              <title>Trả lời</title>
              <path
                d="M15.376 13.2177L16.2861 16.7955L12.7106 15.8848C12.6781 15.8848 12.6131 15.8848 12.5806 15.8848C11.3779 16.5678 9.94767 16.8931 8.41995 16.7955C4.94194 16.5353 2.08152 13.7381 1.72397 10.2578C1.2689 5.63919 5.13697 1.76863 9.75264 2.22399C13.2307 2.58177 16.0261 5.41151 16.2861 8.92429C16.4161 10.453 16.0586 11.8841 15.376 13.0876C15.376 13.1526 15.376 13.1852 15.376 13.2177Z"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
            </svg>
            <div>
              {data?.comments
                ? data.comments.length
                  ? data.comments.length
                  : data.comments
                : null}
            </div>
            <div
              onClick={handleActionCLick}
              className="click"
              data-type="comment"
            ></div>
          </div>
        </div>
        <div className="action-btn">
          <div
            className="box"
            style={
              data?.repost
                ? { color: "var(--dark-color)", fontWeight: "500" }
                : {}
            }
          >
            <svg
              aria-label="Đăng lại"
              role="img"
              viewBox="0 0 18 18"
              style={{
                "--fill": "currentColor",
                "--height": "18px",
                "--width": "18px",
                stroke: "transparent",
              }}
            >
              <title>Đăng lại</title>
              <path d="M6.413.735a.625.625 0 0 1 .88-.075l2.672 2.25a.625.625 0 0 1-.402 1.103h-4.36a2.75 2.75 0 0 0-2.75 2.75v4.5a2.75 2.75 0 0 0 2.75 2.75.625.625 0 1 1 0 1.25 4 4 0 0 1-4-4v-4.5a4 4 0 0 1 4-4H7.85L6.488 1.616a.625.625 0 0 1-.075-.88ZM11.587 17.29a.625.625 0 0 1-.88.076l-2.672-2.25a.625.625 0 0 1 .402-1.103h4.36a2.75 2.75 0 0 0 2.75-2.75v-4.5a2.75 2.75 0 0 0-2.75-2.75.625.625 0 1 1 0-1.25 4 4 0 0 1 4 4v4.5a4 4 0 0 1-4 4H10.15l1.362 1.147a.625.625 0 0 1 .075.88Z"></path>
              {data?.repost ? (
                <path
                  d="m11.733 7.2-3.6 3.6L6.27 8.937"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth=".75"
                ></path>
              ) : null}
            </svg>
            <div>{data?.reposts ? data.reposts : null}</div>
            <div
              onClick={handleActionCLick}
              className="click"
              data-type="repost"
            ></div>
          </div>
        </div>
        <div className="action-btn">
          <div className="box">
            <svg
              aria-label="Chia sẻ"
              role="img"
              viewBox="0 0 18 18"
              style={{
                "--fill": "transparent",
                "--height": "18px",
                "--width": "18px",
              }}
            >
              <title>Chia sẻ</title>
              <path
                d="M15.6097 4.09082L6.65039 9.11104"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
              <path
                d="M7.79128 14.439C8.00463 15.3275 8.11131 15.7718 8.33426 15.932C8.52764 16.071 8.77617 16.1081 9.00173 16.0318C9.26179 15.9438 9.49373 15.5501 9.95761 14.7628L15.5444 5.2809C15.8883 4.69727 16.0603 4.40546 16.0365 4.16566C16.0159 3.95653 15.9071 3.76612 15.7374 3.64215C15.5428 3.5 15.2041 3.5 14.5267 3.5H3.71404C2.81451 3.5 2.36474 3.5 2.15744 3.67754C1.97758 3.83158 1.88253 4.06254 1.90186 4.29856C1.92415 4.57059 2.24363 4.88716 2.88259 5.52032L6.11593 8.7243C6.26394 8.87097 6.33795 8.94431 6.39784 9.02755C6.451 9.10144 6.4958 9.18101 6.53142 9.26479C6.57153 9.35916 6.59586 9.46047 6.64451 9.66309L7.79128 14.439Z"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
            </svg>
            <div>{data?.shares ? data.shares : null}</div>
            <div
              onClick={handleActionCLick}
              className="click"
              data-type="share"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
