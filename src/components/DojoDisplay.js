import { Context } from "../App";
import { useContext } from "react";
import DojoDef from "./DojoDef";

export default function DojoDisplay() {
  let app = useContext(Context);
  let state = app.state;
  let defs = state.definitions;
  let foundWord = state.foundWord;
  let searchWord = state.searchWord;
  let defsSelected = state.defsSelected;
  return (
    <>
      <div className="dict-def-display">
        <label>
          Select All Definitions
          <input className="def-select-all" type="checkbox" />
        </label>
        {defsSelected.includes(true) === true && <button>Save Definitions</button>}

        <div className="def-title">{foundWord === "" ? searchWord : foundWord}</div>
        <div className="def-definitions">
          {defs.length !== 0 &&
            defs.map((def, i) => {
              return <DojoDef def={def} i={i} />;
            })}
        </div>
      </div>
    </>
  );
}

//**************************************************************************************//

// make if definition already in dojo, checkbox doesnt appear; instead show 'already in deck'
// be able to select multiple defs and add to dojo deck/study decks
// add functionality to save button that adds all selected defs to dojo deck

// add study button that promps whether you want to do synonym or antonyms
// on same prompt display how many syns/antonyms there are in teh database and ask how many they would like to go for, max is 6 at a time
// replace the {it} in the example sentences with italics tags

// add function to add own antonyms or snynonyms that adds to ant and syn array , not the copy and saves to local if when answer is wrong or add a def / syn / antonym on search
// make it so if someone wants to delete a word outside of a study deck that has custom definitions, antonyms, or synonyms they are alerted that those will be removed permantley
// make sure the alert that pops up for the antonyms also works for synonyms if there are none.
// try adjusting checked radio buttons by using onChange instead of using conditional rendering like we have now
// make so if answer is entered that has already been answered the user is alerted
// if all 6 anwers are answered ask if they want to do 6 more?
// choose how many definitions are goinng to be put, create a see more button for it (dictionary side and dojo side)
// is dojo going to pool all anytonyms and synonyms for a word or just one particular usage?
// create save to dojo button
// create save to dojo deck
// add home btn or some button to navigate out of this page
// also create place holder display for the period before someone searches thier first word
// make it so all synonyms and antonym can be clicked on and when clicked on it fires the handle search function searching the clicked word
// make it so when you do search a new word that the limit for both the anytonym and synonyms are set back to 6
// fix first synonym being added to an empty local storage not showing up on 'add' click
// fix the fact that local storage syns and ants are contained in double arrays for some reason
//// go through code and reorganize folders, and files, break into smaller easier to read componenets
