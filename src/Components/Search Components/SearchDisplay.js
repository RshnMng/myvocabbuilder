import {useState, useEffect} from 'react';
import DictionaryDisplay from './DictionaryDisplay';
import ThesaurusDisplay from './ThesaurusDisplay';

export default function SearchDisplay(props){
    const {dictionaryInfo, thesaurusInfo} = props;
    const [displayState, setDisplayState] = useState({
        dictionary: true
    })

    // useEffect(() => {
    //     console.log(dictionaryInfo, 'useEffect')
    // }, [dictionaryInfo])

    return <>
    <label> Dictionary
    <input type='radio' name='search-type' onClick={() => setDisplayState((prevState) => {return {...prevState, dictionary : true}}) }/> 
    {/*when clicked it sets dictionary to true which makes the display show the dictionary data of the selected word */}
    </label>
   <label> Thesaurus
   <input type='radio' name='search-type' onClick={() => setDisplayState((prevState) => {return {...prevState, dictionary : false}})} />
    {/*when clicked it sets dictionary to false which makes the display show the thesaurus  data of the selected word */}
   </label>
  
   {displayState.dictionary ? <DictionaryDisplay dictionaryInfo={dictionaryInfo}/> : <ThesaurusDisplay thesaurusInfo={thesaurusInfo}/>}
    </>
}