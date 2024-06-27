import {useState} from 'react';
import ThesaurusDefinition from './ThesaurusDefinition';

 
export default function ThesaurusWordInfo(props){
    const  {wordInfo} =  props; // import wordInfo from props
    let key = 0;


    const [thesState, setThesState] = useState({ // sets state from info passed in through props
        partOfSpeech: wordInfo.fl,
        searchedWord: wordInfo.meta.id,
        thesDefArray: wordInfo.def[0].sseq,
    })
   
    return <>
        {thesState.thesDefArray.map((item) => { // maps through the array and passes item info and key through props to be used in thesauraus definition
            key++ 
            return <ThesaurusDefinition definitionInfo={item} key={key}/>
        })}
    </>
}