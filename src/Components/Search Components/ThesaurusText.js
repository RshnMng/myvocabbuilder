import {useState} from 'react';
import { wordInfoAndApi } from '../../Pages/Utility Pages/WordInfoAndAPI';
import { globalFunctions } from '../../Pages/Utility Pages/GlobalFunctions';
import ThesaurusButtons from './ThesaurusButtons';

export default function ThesaurusText(props){
    let {textContent, partOfSpeech, id } = props; // import props and save in variable
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




   

    return <>
        <div id={id}>
        <div>{partOfSpeech} </div>
        <div>{textState.definitionText}</div>
        <div>{textState.exampleText}</div>
        <ThesaurusButtons synonyms={textState.synonyms} antonyms={textState.antonyms} id={id} wordInfo={textContent}/>
        </div>
    </>
}

