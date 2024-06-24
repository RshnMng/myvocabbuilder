import {useState} from 'react';
import ThesaurusDefinition from './ThesaurusDefinition';

 
export default function ThesaurusWordInfo(props){
    const  {wordInfo} =  props;
    const [thesState, setThesState] = useState({
        partOfSpeech: wordInfo.fl,
        searchedWord: wordInfo.meta.id,
        thesDefArray: wordInfo.def[0].sseq,
    })
   
    return <>
        {thesState.thesDefArray.map((item) => {
            return <ThesaurusDefinition definitionInfo={item}/>
        })}
    </>
}