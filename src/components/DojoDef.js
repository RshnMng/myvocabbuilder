import { Context } from "../App";
import { useContext, useState, useEffect } from "react";

export default function DojoDef(props) {
  let { def, i } = props;
  let app = useContext(Context);
  let definitions = app.state.definitions;
  let setState = app.setState;
  let defsSelected = app.state.defsSelected;

  let [component, setComponent] = useState({
    addSyn: false,
    addAnt: false,
    syn: "",
    ant: "",
    selected: false,
  });

  useEffect(() => {
    defsSelected.push(component.selected);
    setState((prevState) => {
      return { ...prevState, defsSelected: defsSelected };
    });
  }, [setState, component.selected, defsSelected]);

  function addSynonym() {
    let newValue = !component.addSyn;
    setComponent((prevState) => {
      return { ...prevState, addSyn: newValue };
    });
  }

  function addAntonym() {
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
    let defId = event.target.id;
    let chosenWord = definitions[defId];
    let chosenDefinition = chosenWord[1];
    let storageJSON;
    localStorage.getItem("dojoDeck") === null ? (storageJSON = JSON.stringify([])) : (storageJSON = localStorage.getItem("dojoDeck"));
    let storageDeck = JSON.parse(storageJSON);
    console.log(storageDeck);
    let index;
    name === "syn" ? (index = 4) : (index = 5);
    let chosenArr = chosenWord[index];

    let inStorage = isInStorage(chosenDefinition, storageDeck);

    inStorage ? addToExisting(chosenArr, storageDeck, chosenWord, index, name) : addNew(chosenArr, storageDeck, chosenWord, index, name);
  }

  function isInStorage(definition, deck) {
    let storageDefs = [];

    deck.forEach((item) => {
      storageDefs.push(item[1]);
    });

    let inStorage = storageDefs.includes(definition);
    return inStorage;
  }

  function addToExisting(arr, storage, wordInfo, id, name) {
    name === "syn" ? arr.push(component.syn) : arr.push(component.ant);
    storage.forEach((item) => {
      item[1] === wordInfo[1] && item[id].splice(0, item[id].length, arr);
    });
    setState((prevState) => {
      return { ...prevState, dojoDeck: storage };
    });

    let storageJSON = JSON.stringify(storage);
    localStorage.setItem("dojoDeck", storageJSON);
  }

  function addNew(arr, storage, wordInfo, id, name) {
    name === "syn" ? arr.push(component.syn) : arr.push(component.ant);

    storage.push(wordInfo);

    let storageJSON = JSON.stringify(storage);
    localStorage.setItem("dojoDeck", storageJSON);
  }

  return (
    <>
      <div key={i}>
        <div>{def[0]}</div>
        <div>{def[1]}</div>
        <div>{def[3]}</div>
        <label>
          <input
            type="checkbox"
            name="add-to-dojo"
            onClick={() => {
              setComponent((prevState) => {
                return { ...prevState, selected: !prevState.selected };
              });
              setState((prevState) => {
                return { ...prevState, defsSelected: [] };
              });
            }}
          />
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
            <button
              id={i}
              onClick={(event) => {
                addNewNym(event, "syn");
              }}
            >
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
