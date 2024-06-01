import { Context } from "../App";
import { useContext, useState, useEffect } from "react";

export default function DojoDef(props) {
  let { def, i } = props;
  let app = useContext(Context);
  let definitions = app.state.definitions;
  let setState = app.setState;
  let defsSelected = app.state.defsSelected;
  let chosenDef = app.state.chosenDef;

  let [component, setComponent] = useState({
    // handles the state for only this component thats repeated for every definition per searched word
    addSyn: false,
    addAnt: false,
    syn: "",
    ant: "",
    selected: false,
  });

  console.log(app.state);

  useEffect(() => {
    let chosenDef = definitions[i];
    defsSelected.push(component.selected); // pushes if the definition has been checked or not (true or false) into an array
    setState((prevState) => {
      // saves array into state so it can be accessed through state and keeps it from infinite looping
      return { ...prevState, defsSelected: defsSelected, chosenDef: chosenDef };
    });
  }, [setState, component.selected, defsSelected]); // dependecies for use effect

  function addSynonym() {
    let newValue = !component.addSyn; // flips value of addSyn and saves to newValue
    setComponent((prevState) => {
      return { ...prevState, addSyn: newValue }; // saves newValue as addSyn inside of component
    });
  }

  function addAntonym() {
    let newValue = !component.addAnt; // same as above
    setComponent((prevState) => {
      return { ...prevState, addAnt: newValue }; // same as above
    });
  }

  function updateInput(event, name) {
    // takes either 'syn' or 'ant' as name
    setComponent((prevState) => {
      return { ...prevState, [name]: event.target.value }; // saves whatever user types into text input and saves it in a key value pair using either 'syn' or 'ant as the key inside component state
    });
  }

  function addNewNym(event, name) {
    //takes either 'ant' or 'syn' as a name
    let defId = event.target.id; // takes the id of the button clicked on; this id is used to identify which definition of the word we want to access, because most words will return more than one definition
    let chosenWord = definitions[defId]; // uses id to to specify which definition you want in the definitions array containing all the given definitions of that word, along with other information such as syn and ant arrays
    console.log(chosenWord);
    let chosenDefinition = chosenWord[1]; // extracts only the definition that we chose of the given word
    let storageJSON; // declaring the variable but not assigning a value
    localStorage.getItem("dojoDeck") === null ? (storageJSON = JSON.stringify([])) : (storageJSON = localStorage.getItem("dojoDeck")); // seeing if dojodeck is already set in local storage if so save it inside storageJson variable, if not make the variable an empty array
    let storageDeck = JSON.parse(storageJSON); // turn storageJson into useable javascript

    let index; // declared index without assignment
    name === "syn" ? (index = 4) : (index = 5); // if name passed into function allow index to = 4, if not let index = 5...this index will be used to access the proper array when adding syns or ants, 4 for syns, 5 for ants
    let chosenArr = chosenWord[index]; // chosenArr is whichever array is accesed by name (either syn or ant) and by index (either 4 or 5)

    let inStorage = isInStorage(chosenDefinition, storageDeck); //finds out if the chosen definition is already in our storage deck and saves answer as a boolean in a variable

    inStorage ? addToExisting(chosenArr, storageDeck, chosenWord, index, name) : addNew(chosenArr, storageDeck, chosenWord, index, name);
    //if the definition is already saved in our storage deck then we want add more synonyms or antonyms to that specific chosen definition of that chosen word so we run add to existing -- we are modifying an already saved array in our storage deck
    // if this is the first time we are adding a syn or ant to a definition of a word that isnt already in storage, we run add new -- we are both adding to the storage deck and adding a syn or ant at the same time
  }

  function isInStorage(definition, deck) {
    // takes definition and storage deck
    let storageDefs = []; // creating a new array on every function run

    deck.forEach((item) => {
      // cycles through storage deck being passed in
      storageDefs.push(item[1]); // while cycling through storage deck it finds all the definitions already saved in storage deck and adds them to an empty array we just made;
    });

    let inStorage = storageDefs.includes(definition); // goes through the array of storage defs we just created and sees if the definition is already in our storage deck and saves the true or false inside of a variable
    return inStorage; // returns boolean based on if our current definition is already in our storage deck
  }

  function addToExisting(arr, storage, wordInfo, index, name) {
    name === "syn" ? arr.push(component.syn) : arr.push(component.ant);
    // the arr passed in is chosen array which is responsible for housing the syns or ants of our current definition depending on what the user chose (this was done by assigning index in the previous function)
    // if the name passed in is syn then we want to take the chosen array (which will already be the one housing syns before being passed in) and add the users input saved in component.syn;
    // if the name doesnt equal syn then we want to take the chosen array (which will already be the one housing ants) and add the user input saved in the component.ant;

    storage.forEach((item) => {
      // loop through storage deck being passed in;

      item[1] === wordInfo[1] && item[index].splice(0, item[index].length, arr);
      // compares the definition in storage whilelooping to the current chosen word defintion to find the match;
      // once the match is found, we use index (either 4 or 5) to choose either synonym array or antonym array of the word saved in storage;
      // then we use splice to completely replace the previous array with the new array that we just pushed our new syn/ant to;
    });
    setState((prevState) => {
      return { ...prevState, dojoDeck: storage }; // after we have modified our storage array by adding new syns/ants to our desired definition, we update our app state key dojo deck
    });

    let storageJSON = JSON.stringify(storage); // we then make this info stringified so we can save to local storage
    localStorage.setItem("dojoDeck", storageJSON); // save to local storage
  }

  function addNew(arr, storage, wordInfo, name) {
    name === "syn" ? arr.push(component.syn) : arr.push(component.ant); // same as above in add to existing

    storage.push(wordInfo); // takes all the word info and pushes it to storage deck array

    let storageJSON = JSON.stringify(storage); // makes stringified to be saved in local storage
    localStorage.setItem("dojoDeck", storageJSON); // saves in local storage
  }

  let thisDef = def[1];
  // this whole component is being passed props because its an iteration (item) in a map array method, these props are named as def //
  // def[1] is extracting the definition of this particular iteration to be displayed on screen from the word being searched

  let storageJSON = localStorage.getItem("dojoDeck"); // getting local storage deck json ;
  let storageDeck = JSON.parse(storageJSON); // parsing storagedeck information to make usable on the top level of compoenent so its usable in the return block

  return (
    <>
      <div id={i} key={i}>
        <div>{def[0]}</div> {/* part of speech */}
        <div>{thisDef}</div> {/* definition */}
        <div>{def[3]}</div> {/* example sentence */}
        {storageDeck === null || storageDeck[i] === undefined || storageDeck.includes(chosenDef) == false ? (
          /* if storage deck is empty, or if storage decks length is less than the number of definitions the word we are searching for has 
            (remember because we are mapping this whole component) and the id we are using to access our storage info goes higher than the amount of items we have our storage, 
            or if the current definition doesnt match whats in the storage deck --- we want 1. no error to be thrown 2. we want an checkbox to be dislayed that we will use as an event handler */
          <label>
            <input
              type="checkbox"
              name="add-to-dojo"
              id={i}
              onClick={(event) => {
                let defId = event.target.id; // takes the id of the button clicked on; this id is used to identify which definition of the word we want to access, because most words will return more than one definition
                let chosenWord = definitions[defId]; // uses id to to specify which definition you want in the definitions array containing all the given definitions of that word, along with other information such as syn and ant arrays
                console.log(chosenWord);
                let selectedDef = event.target; // save the definition associated with the input in a variable
                component.selected ? selectedDef.setAttribute("selected", false) : selectedDef.setAttribute("selected", true); // set an attribute named checked and assign it to true
                setComponent((prevState) => {
                  return { ...prevState, selected: !prevState.selected }; // set component state to the opposite of whatever it was previously
                });
                setState((prevState) => {
                  return { ...prevState, defsSelected: [] }; // reset defs selected array in app state to empty
                });
              }}
            />
            add to dojo
          </label>
        ) : (
          <div class="already-in-deck-div">
            {/* if the definition being displayed is already in our dojo deck show this instead  */}
            <div>Already In Deck</div>
          </div>
        )}
        <div>
          <div>synonyms</div>
          {def[4].map((word) => {
            return <li>{word}</li>; // maps through synonym array from the info being passed through props and displays them one by one
          })}
          {
            def[5].length === 0 ? <div>there are no listed antonyms for this use of the word</div> : <div>antonyms</div>
            // if there isnt any antonyms for this word, display that for user, if there is display antonyms label
          }

          <div>
            {def[5].map((word) => {
              //map through antonym array and display in on page
              return <li>{word}</li>;
            })}
          </div>
        </div>
        {component.addSyn ? ( // if addSyn is true -- show cancel button
          <button id={i} onClick={(event) => addSynonym(event)}>
            cancel
          </button>
        ) : (
          // if addSyn is false -- show add syn button
          <button id={i} onClick={(event) => addSynonym(event)}>
            add synonym
          </button>
        )}
        {component.addAnt ? ( //if addAnt is true -- show cancel button
          <button id={i} onClick={(event) => addAntonym(event)}>
            cancel
          </button>
        ) : (
          // if addSyn is false -- show add ant button
          <button id={i} onClick={(event) => addAntonym(event)}>
            add antonym
          </button>
        )}
        {component.addSyn && ( // if addSyn is true show label, text input and save button to allow adding a synonym
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

// when we have an empty storage, first laod a page, search a word, add first definition to dojo deck,
// click save definitions, then unclick it, click another word and then click defintions, it throws an error
// that says inputElem.hasAttribute is not a function on dojo display file -- it seems like for some reason whats being accessed changes between the renders and is making it render the 'text' portion of childnodes instead of the element part where the attribute should be

// make it so that when you click add to dojo again the checked atttribute goes away
// make it so duplicates cant be added to storage when save definitions is clicked
