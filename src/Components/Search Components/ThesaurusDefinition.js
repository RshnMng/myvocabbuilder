import ThesaurusText from "./ThesaurusText";

export default function ThesaurusDefinition(props){
    let key = 0;
    let {definitionInfo, partOfSpeech } = props;

    console.log(partOfSpeech)


    return <>
        {definitionInfo.map((item) => {
            key++
            return <ThesaurusText textContent={item} key={key} partOfSpeech={partOfSpeech}/> 
        })}
    </>
}