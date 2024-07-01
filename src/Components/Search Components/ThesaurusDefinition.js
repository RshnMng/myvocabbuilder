import ThesaurusText from "./ThesaurusText";

export default function ThesaurusDefinition(props){
    let key = 0;

    let {definitionInfo, partOfSpeech } = props;


   

    return <>
        {definitionInfo.map((item) => {
            key++
            return <div id={key}>
                 <ThesaurusText textContent={item} key={key} partOfSpeech={partOfSpeech} id={key} /> 
            </div>
           
        })}
    </>
}