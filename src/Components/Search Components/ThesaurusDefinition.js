import ThesaurusText from "./ThesaurusText";

export default function ThesaurusDefinition(props){
    let {definitionInfo} = props;

    return <>
        {definitionInfo.map((item) => {
            return <ThesaurusText textContent={item}/> 
        })}
    </>
}