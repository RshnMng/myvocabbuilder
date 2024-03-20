import React from "react";
import { Link } from "react-router-dom";

export default function ChoosePathCard(props) {
  let { title, linkPath, img } = props;
  return (
    <>
      <div className="col-12 welcome-card">
        <div>{title}</div>
        <div className="col-12 d-flex flex-column">
          <div className={img}></div>
          <Link to={linkPath}>{/* <button>enter</button> */}</Link>
        </div>
      </div>
    </>
  );
}
