import { useState } from "react";

export default function WordSections(props) {
  let { title, array, index } = props;
  let [limit, setlimit] = useState(6);

  function changeLimit() {
    setlimit((prevState) => {
      return prevState + 6;
    });
  }

  function showAll() {
    setlimit(array.length + 1);
  }

  function resetLimit() {
    setlimit(6);
  }

  return (
    <div className="def">
      <div className="label">
        {title}
        {`(${array.length})`}
      </div>
      <div className="d-flex justify-content-around flex-wrap">
        {array.map((word) => {
          index = index + 1;
          return index < limit ? <div className="col-2">{word}</div> : <div className="col-2 ml-1 mr-1 hidden">{word}</div>;
        })}
      </div>
      {limit < array.length ? (
        <div className="btn-div">
          <button className="see-more-btn m-auto" onClick={changeLimit}>
            see more...{" "}
          </button>
          <button onClick={showAll}>show all...</button>
        </div>
      ) : (
        <div className="btn-div">
          <button onClick={resetLimit}>hide</button>
        </div>
      )}
    </div>
  );
}
