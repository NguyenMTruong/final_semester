import "./Images.scss";
import { useState, useEffect, useRef } from "react";

const Image = ({ input, canRemove = false, onRemoveImage }) => {
  const handleRemove = (index) => {
    if (onRemoveImage) {
      onRemoveImage(index); // Gọi hàm từ component cha
    }
  };
  const [data, setData] = useState(input);
  const boldRef = useRef(null);

  useEffect(() => {
    setData(input);
  }, [input]);

  if (!data || data?.length == 0) return null;

  const handleOne = (e) => {
    if (e.target.offsetHeight > 240) {
      e.target.style.height = "240px";
      e.target.style.width = "auto";
    }
  };
  if (data?.length == 1)
    return (
      <div className="media">
        <div className="container">
          <div className="box">
            <img src={data[0]} alt="" onLoad={handleOne} />
          </div>
        </div>
      </div>
    );

  const refOne = useRef(null);
  const refTwo = useRef(null);
  const handleTwo = () => {
    let sum = refOne.current.offsetWidth + refTwo.current.offsetWidth;

    if (sum > boldRef.current.offsetWidth) {
      const value = (360 * boldRef.current.offsetWidth) / sum - 10 + "px";
      refOne.current.style.height = value;
      refTwo.current.style.height = value;
    }
  };
  if (data?.length == 2)
    return (
      <div className="bold" ref={boldRef}>
        <div className="media i2">
          <div className="box">
            <img src={data[0]} ref={refOne} alt="" />
          </div>
          <div className="box">
            <img src={data[1]} ref={refTwo} alt="" onLoad={handleTwo} />
          </div>
        </div>
      </div>
    );

  return (
    <div className="media is">
      <div className="container">
        {data.map((d, index) => (
          <div className="box">
            <img src={d} key={index} />
            {canRemove && (
              <button
                className="remove-btn"
                onClick={() => handleRemove(index)}
              >
                Xóa
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;
