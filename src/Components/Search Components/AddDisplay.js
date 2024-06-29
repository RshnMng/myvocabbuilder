import {useState, useContext} from 'react';
import { NymContext } from './NymsDisplay'


export default function AddDisplay(props){
    let {nyms, type} = props
    let nymsInfo = useContext(NymContext);
    let nymsState = nymsInfo[0];
    let setNymsState = nymsInfo[1];
    let display = nymsState.display;
    

  

    

    let [addDisplayState, setAddDisplayState] = useState({
        addedNym: '',
        exampleSentence: ''
    })

    function updateInfo(event, location) {
        let info = event.target.value;
        setAddDisplayState((prevState) => {return {...prevState, [location]: info}})
    }

    function addNym(){
        let addedData
        if(addDisplayState.exampleSentence === ''){
             addedData = <div>
                <div>{addDisplayState.addedNym}</div>
            </div>
        } else {
             addedData = <div>
                <div>{addDisplayState.addedNym}</div>
                <div>{addDisplayState.exampleSentence}</div>
            </div>
        }
      
        display.unshift(addedData);
        setNymsState((prevState) => { return {...prevState, display: display, displayLength: nymsState.displayLength + 1}})
    }
   
    return <div>
        <label> Enter {`${type}`} Here
        <input type='text' onChange={(event) => updateInfo(event, 'addedNym')}/>
        </label>
        <label> Provide Example Sentence (Optional)
        <input type='text' onChange={(event) => updateInfo(event, 'exampleSentence')}/>
        </label>
        <button onClick={() => addNym()}>Add</button>
    </div>
}