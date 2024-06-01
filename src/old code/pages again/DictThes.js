import Search from "../../components/Search";
import Random from "../../components/Random";
import Definition from "../../components/Definition";
// import { Context } from "../App";
// import React, { useContext } from "react";

export default function DictThes() {
  // let state = useContext(Context);

  return (
    <>
      <div className="container-fliud">
        <div className="col-12 dict-title"> Dictionary & Thesaurus </div>
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
            <Definition />
          </div>
        </div>
      </div>
    </>
  );
}
