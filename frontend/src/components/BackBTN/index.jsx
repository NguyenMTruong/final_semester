import "./BackBTN.scss";

const BackBTN = () => {
  const handleReturn = (e) => {
    e.stopPropagation();
    history.back();
  };

  return (
    <div className="back-btn" onClick={handleReturn}>
      <div className="container">
        <svg
          aria-label="Quay lại"
          role="img"
          viewBox="0 0 12 12"
          style={{ fill: "currentColor", height: "12px", width: "12px" }}
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

export default BackBTN;
