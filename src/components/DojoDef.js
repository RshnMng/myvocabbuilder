import { Context } from "../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function DojoDef(props) {
  let { def, i } = props;
  let app = useContext(Context);
  let definitions = app.state.definitions;
  let setState = app.setState;

  let [component, setComponent] = useState({
    addSyn: false,
    addAnt: false,
    syn: "",
    ant: "",
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

  function updateInput(event, name) {
    setComponent((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  }

  function addNewNym(event, name) {
    let id = event.target.id;
    let index;
    name === "syn" ? (index = 4) : (index = 5);

    let chosenArr = definitions[id][index];

    index === 4 ? chosenArr.push(component.syn) : chosenArr.push(component.ant);

    definitions[id].splice(4, 1, chosenArr);

    setState((prevState) => {
      return { ...prevState, definitions: definitions };
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
          {def[5].length === 0 ? <div>there are no listed antonyms for this use of the word</div> : <div>antonyms</div>}
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

        {component.addSyn && (
          <div className="alert alert-success">
            <div>Add Synonym</div>

            <input type="text" onChange={(event) => updateInput(event, "syn")} />
            <button id={i} onClick={(event) => addNewNym(event, "syn")}>
              save
            </button>
          </div>
        )}
        {component.addAnt && (
          <div className="alert alert-success">
            <div>Add Antonym</div>
            <input type="text" onChange={(event) => updateInput(event, "ant")} />
            <button id={i} onClick={(event) => addNewNym(event, "ant")}>
              save
            </button>
          </div>
        )}
      </div>
    </>
  );
}
