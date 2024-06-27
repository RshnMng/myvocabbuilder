import ThesaurusText from "./ThesaurusText";

export default function ThesaurusDefinition(props){
    let key = 0;
    let {definitionInfo} = props;

    return <>
        {definitionInfo.map((item) => {
            key++
            return <ThesaurusText textContent={item} key={key}/> 
        })}
    </>
}