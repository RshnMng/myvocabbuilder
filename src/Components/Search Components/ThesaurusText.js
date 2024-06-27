import {useState} from 'react';

export default function ThesaurusText(props){
    let {textContent} = props;

    function getAnts(data){
        let fullList = []
        let antList =  data[1].ant_list
        let antList2 = data[1].near_list;


        antList === undefined ? antList = [] : antList.map((wordArr) => {
          wordArr.map((word) => {
            fullList.push(word.wd);
          })
            
        });
        antList2 === undefined ? antList2 = [] : antList2.map((wordArr) => {
            wordArr.map((word) => {
                fullList.push((word.wd))
            })
        })

      return fullList;
    }

   

    function getSyns(data){
        let fullList = []
        let synList =  data[1].syn_list;
        let synList2 = data[1].rel_list;

       

        synList === undefined ? synList = [] : synList.map((wordArr) => {
          wordArr.map((word) => {
            fullList.push(word.wd);
          })
            
        });
         synList2 === undefined ? synList2 = [] : synList2.map((wordArr) => {
            wordArr.map((word) => {
                fullList.push((word.wd))
            })
        })

      return fullList;
    }

    let ants = getAnts(textContent);
    let syns = getSyns(textContent);
    let example;

    textContent[1] === undefined ? example = '' : textContent[1].dt[1] === undefined ? example = '' : example = textContent[1].dt[1][1][0].t;


    

    const [textState, setTextState] = useState({
        definitionText : textContent[1].dt[0][1],
        exampleText: example,
        antonyms: ants,
        synonyms: syns
    })

    console.log(textState.synonyms, textState.definitionText, textState.exampleText, textState.antonyms)
   

    return <>
        <div>check</div>
    </>
}

//Next Steps //

//1. run example text through special character editor before saving in state 
// 2. move get syn and ant functions to global functions and import in to keep clean 
// 3. update comments in app
// 4. display thesaurus info to screen 