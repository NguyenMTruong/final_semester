import "./LayoutDefault.scss";
import { setCreatePost } from "@/slide/AppSlide";
import { setAccessToken, setLogin, setUser } from "@/slide/AuthSlide";
import PostBox from "@/components/CreatePostBox";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const LayoutDefault = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.auth);
  const { createPost } = useSelector((state) => state.app);

  const [load, setLoad] = useState(false);

  const createPostBox = () => {
    dispatch(setCreatePost(true));
    setLoad(true);
  };
  const handleLogout = (e) => {
    dispatch(setLogin(false));
    dispatch(setAccessToken(""));
    dispatch(setUser({}));
    navigate("/login");
  };

  useEffect(() => {
    const midBoxs = document.querySelectorAll(".mid .mid-box");
    switch (location.pathname.substring(1)) {
      case "":
        midBoxs.forEach((box, index) => {
          if (index == 0) box.classList.add("active");
          else box.classList.remove("active");
        });
        break;
      case "search":
        midBoxs.forEach((box, index) => {
          if (index == 1) box.classList.add("active");
          else box.classList.remove("active");
        });
        break;
      case "activity":
        midBoxs.forEach((box, index) => {
          if (index == 3) box.classList.add("active");
          else box.classList.remove("active");
        });
        break;
      case "profile":
        midBoxs.forEach((box, index) => {
          if (index == 4) box.classList.add("active");
          else box.classList.remove("active");
        });
        break;
      default:
        midBoxs.forEach((box, index) => {
          box.classList.remove("active");
        });
        break;
    }
  });

  return (
    <>
      <div className="layout-default">
        <div className="nav grid ">
          <div className="top">
            <NavLink to="/">
              <div className="top-box flex">
                <svg
                  aria-label="Threads"
                  fill="var(--barcelona-primary-icon)"
                  height="100%"
                  role="img"
                  viewBox="0 0 192 192"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
                </svg>
              </div>
            </NavLink>
          </div>
          <div className="mid flex flex-col">
            <div className="mid-box flex">
              <svg aria-label="Trang chủ" role="img" viewBox="0 0 26 26">
                <title>Trang chủ</title>
                <path
                  d="M2.25 12.8855V20.7497C2.25 21.8543 3.14543 22.7497 4.25 22.7497H9.25C9.52614 22.7497 9.75 22.5258 9.75 22.2497V17.6822V16.4997C9.75 14.7048 11.2051 13.2497 13 13.2497C14.7949 13.2497 16.25 14.7048 16.25 16.4997V17.6822V22.2497C16.25 22.5258 16.4739 22.7497 16.75 22.7497H21.75C22.8546 22.7497 23.75 21.8543 23.75 20.7497V12.8855C23.75 11.3765 23.0685 9.94814 21.8954 8.99882L16.1454 4.34539C14.3112 2.86094 11.6888 2.86094 9.85455 4.34539L4.10455 8.99882C2.93153 9.94814 2.25 11.3765 2.25 12.8855Z"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                ></path>
              </svg>
              <NavLink to="/" className="link"></NavLink>
            </div>
            <div className="mid-box flex">
              <svg aria-label="Tìm kiếm" role="img" viewBox="0 0 26 26">
                <title>Tìm kiếm</title>
                <path
                  clipRule="evenodd"
                  d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <NavLink to="/search" className="link"></NavLink>
            </div>
            <div className="mid-box flex box">
              <svg aria-label="Tạo" role="img" viewBox="0 0 12 12">
                <title>Tạo</title>
                <path
                  d="M6 2v8m4-4H2"
                  stroke="rgba(0, 0, 0, 0.75)"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
              <div className="link" onClick={createPostBox}></div>
            </div>
            <div className="mid-box flex">
              <svg aria-label="Thông báo" role="img" viewBox="0 0 32 32">
                <title>Thông báo</title>
                <path
                  d="M5.5 12.8568C5.5 17.224 9.22178 21.5299 15.0332 25.2032C15.3554 25.397 15.7401 25.5909 16 25.5909C16.2703 25.5909 16.655 25.397 16.9668 25.2032C22.7782 21.5299 26.5 17.224 26.5 12.8568C26.5 9.11212 23.8698 6.5 20.4599 6.5C18.4847 6.5 16.9356 7.39792 16 8.74479C15.0851 7.40812 13.5257 6.5 11.5401 6.5C8.14059 6.5 5.5 9.11212 5.5 12.8568Z"
                  stroke="rgba(0, 0, 0, 0.75)"
                  strokeWidth="2.5"
                ></path>
              </svg>
              <NavLink to="/activity" className="link"></NavLink>
            </div>
            <div className="mid-box flex">
              <svg aria-label="Trang cá nhân" role="img" viewBox="0 0 26 26">
                <title>Trang cá nhân</title>
                <circle
                  cx="13"
                  cy="7.25"
                  r="4"
                  stroke="rgba(0, 0, 0, 0.75)"
                  strokeWidth="2.5"
                ></circle>
                <path
                  d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
                  stroke="rgba(0, 0, 0, 0.75)"
                  strokeWidth="2.5"
                ></path>
              </svg>
              <NavLink to="/profile" className="link"></NavLink>
            </div>
          </div>
          <div className="end">
            <div className="end-box flex" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <div></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <Outlet />
          </div>
        </div>
        {isLogin ? (
          <div className="cr-btn__post" onClick={createPostBox}>
            <svg aria-label="Tạo" role="img" viewBox="0 0 12 12">
              <title>Tạo</title>
              <path
                d="M6 2v8m4-4H2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>
        ) : (
          <></>
        )}
      </div>
      {createPost ? <PostBox /> : null}
    </>
  );
};

export default LayoutDefault;
