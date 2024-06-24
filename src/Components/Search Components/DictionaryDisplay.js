import DictionaryWordInfo from "./DictionaryWordInfo";
import { useEffect } from "react";

export default function DictionaryDisplay(props){
    const {dictionaryInfo} = props;
    let key = 1;


    // useEffect(() => {
    //     console.log(dictionaryInfo, 'useEffect')
    // }, [dictionaryInfo])

    return <>
   {dictionaryInfo.map((item) => { 
    key++
    return <DictionaryWordInfo defInfo={item} key={key}/>
   })}
    </>
}