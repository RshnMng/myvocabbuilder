import DictionaryWordInfo from "./DictionaryWordInfo";

export default function DictionaryDisplay(props){
    const {dictionaryInfo} = props; // dictionary info obtained through props and destructured into a variable
    let key = 1;


    return <>
   {dictionaryInfo.map((item) => {  // variable is mapped through, key is updated. The info for Each item of array is passed in through props to its own specific instance of a component named Dictionary word info along with an unique key 
    key++
    return <DictionaryWordInfo defInfo={item} key={key}/>
   })}
    </>
}