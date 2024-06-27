import {useState} from 'react';
import { wordInfoAndApi } from '../../Pages/Utility Pages/WordInfoAndAPI';
import { globalFunctions } from '../../Pages/Utility Pages/GlobalFunctions';

export default function ThesaurusText(props){
    let {textContent, partOfSpeech} = props; // import props and save in variable
    let exampleTxt;             // declare variable to be used later
    let defTxt = textContent[1].dt[0][1]; // gets definition and save into variable defTxt

    let ants = wordInfoAndApi.getAnts(textContent); // runs functions on info passed into props to extract an array of words one for synonyms and one for antonyms
    let syns = wordInfoAndApi.getSyns(textContent);

    textContent[1] === undefined ? exampleTxt = '' : textContent[1].dt[1] === undefined ? exampleTxt = '' : exampleTxt = textContent[1].dt[1][1][0].t; // extracts the example text from the data, if undefined then it is set to an empty string to avoid throwing errors

    let example = globalFunctions.removeSpecialChars(exampleTxt); // both example and definiton texts are passed through these functions to remove all the special characters and improve the user experience
    let definition = globalFunctions.removeSpecialChars(defTxt);
    

    const [textState, setTextState] = useState({ // now that the definition and examples along with the syns and ants are extracted - we save it in state
        definitionText : definition,
        exampleText: example,
        antonyms: ants,
        synonyms: syns
    })

 console.log(textState);

   

    return <>
        <div>{partOfSpeech} </div>
        <div>{textState.definitionText}</div>
        <div>{textState.exampleText}</div>
        {textState.synonyms.length > 0 && <button>Show Synonyms</button>} 
        {textState.antonyms.length > 0 && <button>Show Antonyms</button>}
    </>
}

//Next Steps //

// turn synonym and antonym buttons into their own components, when there are syns or ants display show button
// when not display add button
// when show button is clicked it shows 6 more, there is also a see more button displayed, a close button and an add button
// when all syns or antonyms are displayed, the see more goes away
// add button clicked, a pop up comes up with a space to add a word and an example sentence 
// on save, a pop up will come up explaining that adding a modification will automatically save the word and definition to your study deck, continue?
// create add to deck functionality for dictionary and thesaurus