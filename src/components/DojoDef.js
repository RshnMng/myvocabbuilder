import { Context } from "../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function DojoDef(props) {
  let { def, i } = props;
  let app = useContext(Context);

  let [component, setComponent] = useState({
    addSyn: false,
    addAnt: false,
  });

  function addSynonym(event) {
    let newValue = !component.addSyn;
    setComponent((prevState) => {
      return { ...prevState, addSyn: newValue };
    });
  }

  function addAntonym(event) {
    let newValue = !component.addAnt;
    setComponent((prevState) => {
      return { ...prevState, addAnt: newValue };
    });
  }
  return (
    <>
      <div key={i}>
        <div>{def[0]}</div>
        <div>{def[1]}</div>
        <div>{def[3]}</div>
        <label>
          <input type="checkbox" name="add-to-dojo" />
          add to dojo
        </label>
        <div>
          <div>synonyms</div>
          {def[4].map((word) => {
            return <li>{word}</li>;
          })}
          {def[5].length == 0 ? <div>there are no listed antonyms for this use of the word</div> : <div>antonyms</div>}
          <div>
            {def[5].map((word) => {
              return <li>{word}</li>;
            })}
          </div>
        </div>
        {component.addSyn ? (
          <button id={i} onClick={(event) => addSynonym(event)}>
            cancel
          </button>
        ) : (
          <button id={i} onClick={(event) => addSynonym(event)}>
            add synonym
          </button>
        )}
        {component.addAnt ? (
          <button id={i} onClick={(event) => addAntonym(event)}>
            cancel
          </button>
        ) : (
          <button id={i} onClick={(event) => addAntonym(event)}>
            add antonym
          </button>
        )}
        <div>
          {component.addSyn && <div>add some shit</div>}
          {component.addAnt && <div> add some other shit </div>}
        </div>
        {component.addSyn && (
          <div className="alert alert-success">
            <div>Add Synonym</div>
            <input type="text" />
            <input type="text" />
            <button>save</button>
          </div>
        )}
        {component.addAnt && (
          <div className="alert alert-success">
            <div>Add Antonym</div>
            <input type="text" />
            <input type="text" />
            <button>save</button>
          </div>
        )}
      </div>
    </>
  );
}
