import "./CreatePostBox.scss";
import Image from "../Image";

import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { setCreatePost } from "@/slide/AppSlide";
import axios from "axios";
import { backendUrl } from "@/global";

const PostBox = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);
  const { createPost } = useSelector((state) => state.app);

  const divRef = useRef(null);
  const hiddenRef = useRef(null);
  const imageInputRef = useRef(null);
  const btnRef = useRef(null);

  const handleInputText = () => {
    const textContent = divRef.current.innerText.trim();
    if (textContent !== "") {
      btnRef.current.classList.add("active");
      hiddenRef.current.style.display = "none";
    } else hiddenRef.current.style.display = "block";

    if (textContent === "" && images.length === 0)
      btnRef.current.classList.remove("active");

    setContent(textContent);
  };

  const handleInputImage = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesUrls = files.map((file) => URL.createObjectURL(file));

    setFiles((prevFiles) => [...prevFiles, ...files]);
    setImages((prevImages) => [...prevImages, ...imagesUrls]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const exit = () => {
    dispatch(setCreatePost(false));
  };

  const handleCreate = (e) => {
    e.stopPropagation();
    if (!e.target.classList.contains("active")) return;
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("content", content);
    if (files.length > 0)
      files.forEach((file) => formData.append("files", file));
    else formData.append("files", new Blob([]));

    axios
      .post(`${backendUrl}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        dispatch(setCreatePost(false));
      })
      .catch((err) => console.log(err));
  };

  console.log(images);

  return (
    <>
      {createPost ? (
        <div
          className="create-post"
          onClick={() => {
            dispatch(setCreatePost(false));
          }}
        >
          <div
            className="container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="head">
              <div className="exit" onClick={exit}>
                Hủy
              </div>
              <div className="text">Tạo bài viết mới</div>
              <div className="btn"></div>
            </div>
            <div className="end">
              <div className="box">
                <div className="avatar">
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : "https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&rs=1&pid=ImgDetMain"
                    }
                    alt=""
                  />
                </div>
                <div className="username">{user.username}</div>
                <div className="text">
                  <div
                    ref={divRef}
                    aria-label="Trường văn bản trống. Hãy nhập vào văn bản để tạo bài viết mới"
                    contentEditable="true"
                    role="textbox"
                    spellCheck="true"
                    tabIndex="0"
                    aria-placeholder="Có gì mới?"
                    dataLexicalEditor="true"
                    style={{
                      userSelect: "text",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      outline: "none",
                      overflowX: "auto",
                      overflowY: "visible",
                      tabSize: 1,
                      position: "relative",
                    }}
                    onInput={handleInputText}
                  >
                    <p style={{ margin: 0 }}>
                      <br />
                    </p>
                  </div>
                  <div aria-hidden="true" ref={hiddenRef}>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        pointerEvents: "none",
                        color: "var(--dark-overlay)",
                      }}
                    >
                      <span
                        dir="auto"
                        style={{
                          overflow: "visible",
                          fontWeight: "400",
                          position: "relative",
                          wordBreak: "break-word",
                        }}
                      >
                        Có gì mới?
                      </span>
                    </div>
                  </div>
                </div>
                {images.length > 0 && (
                  <div className="image">
                    <Image
                      input={images}
                      canRemove={true}
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                )}
                <div className="add">
                  <div className="box">
                    <svg
                      onClick={handleInputImage}
                      aria-label="Đính kèm file phương tiện"
                      role="img"
                      viewBox="0 0 24 24"
                      style={{
                        fill: "currentcolor",
                        height: "20px",
                        width: "20px",
                      }}
                    >
                      <title>Đính kèm file phương tiện</title>
                      <g>
                        <path
                          clipRule="evenodd"
                          d="M2.00207 9.4959C1.65132 7.00019 1.47595 5.75234 1.82768 4.73084C2.13707 3.83231 2.72297 3.05479 3.50142 2.50971C4.38639 1.89005 5.63425 1.71467 8.12996 1.36392L10.7047 1.00207C13.2004 0.651325 14.4482 0.47595 15.4697 0.827679C16.3682 1.13707 17.1458 1.72297 17.6908 2.50142C17.9171 2.82454 18.0841 3.19605 18.2221 3.65901C17.7476 3.64611 17.2197 3.64192 16.6269 3.64055C16.5775 3.5411 16.5231 3.44881 16.4621 3.36178C16.0987 2.84282 15.5804 2.45222 14.9814 2.24596C14.3004 2.01147 13.4685 2.12839 11.8047 2.36222L7.44748 2.97458C5.78367 3.20841 4.95177 3.32533 4.36178 3.73844C3.84282 4.10182 3.45222 4.62017 3.24596 5.21919C3.01147 5.90019 3.12839 6.73209 3.36222 8.3959L3.97458 12.7531C4.15588 14.0431 4.26689 14.833 4.50015 15.3978C4.50083 16.3151 4.50509 17.0849 4.53201 17.7448C4.13891 17.4561 3.79293 17.1036 3.50971 16.6991C2.89005 15.8142 2.71467 14.5663 2.36392 12.0706L2.00207 9.4959Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                        <g>
                          <g clipPath="url(#:ra:)">
                            <rect
                              fill="none"
                              height="15.5"
                              rx="3.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              width="15.5"
                              x="6.75"
                              y="5.8894"
                            ></rect>
                            <path
                              d="M6.6546 17.8894L8.59043 15.9536C9.1583 15.3857 10.0727 15.3658 10.6647 15.9085L12.5062 17.5966C12.9009 17.9584 13.5105 17.9451 13.8891 17.5665L17.8181 13.6376C18.4038 13.0518 19.3536 13.0518 19.9394 13.6375L22.0663 15.7644"
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            ></path>
                            <circle
                              cx="10.75"
                              cy="9.8894"
                              fill="currentColor"
                              r="1.25"
                            ></circle>
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id=":ra:">
                          <rect
                            fill="white"
                            height="17"
                            rx="4.5"
                            width="17"
                            x="6"
                            y="5.1394"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <input
                  type="file"
                  ref={imageInputRef}
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="btn">
              <div
                className={images.length > 0 ? "box active" : "box"}
                ref={btnRef}
                onClick={handleCreate}
              >
                Đăng
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostBox;
