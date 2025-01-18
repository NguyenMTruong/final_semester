import "./Back.scss";

const Back = () => {
  const goBack = (e) => {
    history.back();
  };
  return (
    <div className="box back icon">
      <div className="icon" onClick={goBack}>
        <svg
          aria-label="Quay lại"
          role="img"
          viewBox="0 0 12 12"
          style={{
            fill: "currentcolor",
            height: "12px",
            width: "12px",
          }}
        >
          <title>Quay lại</title>
          <path
            d="M1 6h10M1 6l4-4M1 6l4 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Back;
