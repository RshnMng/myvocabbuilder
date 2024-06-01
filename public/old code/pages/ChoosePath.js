// import React from "react";
import ChoosePathCards from "../components/ChoosePathCards";

export default function ChoosePath() {
  return (
    <>
      <div className="container-fluid d-flex flex-column flex-grow-1 choosePath ">
        Vocabulary Builder
        <div className="col-12 d-flex">
          <div className="col-6 choosePath-split dict-split flex-grow-1">
            <ChoosePathCards title="Dictionary & Thesaurus" linkPath="/dict&thes" img="dictionary-img" />
          </div>
          <div className="col-6 choosePath-split train-split flex-grow-1">
            <ChoosePathCards title="Synonym & Antonym Trainer" linkPath="/trainer" img="trainer-img" />
          </div>
        </div>
      </div>
    </>
  );
}
