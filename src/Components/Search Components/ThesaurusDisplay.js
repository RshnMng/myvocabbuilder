import ThesaurusWordInfo from "./ThesaurusWordInfo";

export default function ThesaurusDisplay(props){
    let key = 0;
    const { thesaurusInfo } = props;

    return <>
    {thesaurusInfo.map((item) => {
        key++
        return <ThesaurusWordInfo wordInfo={item} key={key}/>
    })}
    </>
}