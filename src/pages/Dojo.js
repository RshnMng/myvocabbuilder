import Search from "../components/Search";
import Random from "../components/Random";
// import { Context } from "../App";
// import React, { useContext, useState } from "react";
import Fued from "../components/Fued";

export default function Dojo() {
  // let state = useContext(Context);

  return (
    <>
      <div className="container-fliud">
        <div className="col-12 dict-title"> Training Dojo </div>
        <div className="col-12 d-flex dict-main">
          <div className="col-6 d-flex flex-column dict-lookup">
            <div className="col-12 dict-search">
              <Search />
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
