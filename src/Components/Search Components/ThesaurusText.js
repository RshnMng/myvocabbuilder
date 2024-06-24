import {useState} from 'react';

export default function ThesaurusText(props){
    let {textContent} = props;

    

    function getAnts(data){
        let fullList = []
        let antList =  data[1].ant_list
        let synList2 = data[1].near_list;

        antList.map((wordArr) => {
          wordArr.map((word) => {
            fullList.push(word.wd);
          })
            
        });
        // synList2.map((wordArr) => {
        //     wordArr.map((word) => {
        //         fullList.push((word.wd))
        //     })
        // })
      console.log(fullList)
    }

    let check = getAnts(textContent);

    




    const [textState, setTextState] = useState({
        definitionText : textContent[1].dt[0][1],
        exampleText: textContent[1].dt[1][1][0].t,
    })
   

    return <>
        <div>check</div>
    </>
}