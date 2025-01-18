import "./Search.scss";
import { backendUrl } from "@/global";
import UserSearch from "@/components/UserSearch";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const handleInput = (e) => {
    axios
      .get(`${backendUrl}/users/search?query=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") navigate(`/result?query=${inputRef.current.value}`);
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="search-page">
      <div className="head">
        <div className="left"></div>
        <div className="midd">Tìm kiếm</div>
        <div className="right"></div>
      </div>
      <div className="container">
        <div className="scroll">
          <div className="search-btn">
            <div className="box">
              <div className="box">
                <div className="icon">
                  <svg
                    aria-label="Tìm kiếm"
                    role="img"
                    viewBox="0 0 26 26"
                    style={{
                      fill: "transparent",
                      height: "16px",
                      width: "16px",
                    }}
                  >
                    <title>Tìm kiếm</title>
                    <path
                      clipRule="evenodd"
                      d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  className="input-search"
                  type="text"
                  placeholder="Tìm kiếm"
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
          {data ? (
            <>
              {data.map((d) => (
                <UserSearch input={d} />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
