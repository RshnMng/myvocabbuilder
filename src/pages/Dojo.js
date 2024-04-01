import Search from "../components/Search";
import Random from "../components/Random";
import { Context } from "../App";
import React, { useContext, useState } from "react";
import Fued from "../components/Fued";

export default function Dojo() {
  let app = useContext(Context);
  let state = app.state;
  let setState = app.setState;
  let chosenSynAnt = state.chosenSynAnt;

  function chooseSynAnt(event) {
    let choice = event.target.id;
    setState((prevState) => {
      return { ...prevState, chosenSynAnt: choice };
    });
  }

  console.log(state);

  return (
    <>
      <div className="container-fliud">
        <div className="col-12 dict-title"> Training Dojo </div>
        <div className="col-12 d-flex dict-main">
          <div className="col-6 d-flex flex-column dict-lookup">
            <div className="col-12 dict-search">
              <Search />
              {chosenSynAnt === "synonym" ? (
                <div className="ant-syn-select-div">
                  <label>
                    <input checked type="radio" className="ant-syn-select syn-select" name="select" id="synonym" onClick={(event) => chooseSynAnt(event)} />
                    synonym
                  </label>
                  <label>
                    {" "}
                    <input type="radio" className="ant-syn-select ant-select" name="select" id="antonym" onClick={(event) => chooseSynAnt(event)} />
                    antonym
                  </label>
                </div>
              ) : (
                <div className="ant-syn-select-div">
                  <label>
                    <input type="radio" className="ant-syn-select syn-select" name="select" id="synonym" onClick={(event) => chooseSynAnt(event)} />
                    synonym
                  </label>
                  <label>
                    {" "}
                    <input checked type="radio" className="ant-syn-select ant-select" name="select" id="antonym" onClick={(event) => chooseSynAnt(event)} />
                    antonym
                  </label>
                </div>
              )}
            </div>
            <div className="col-12 dict-random">
              <Random />
            </div>
          </div>
          <div className="col-6 dict-def">
            <Fued />
          </div>
        </div>
      </div>
    </>
  );
}
