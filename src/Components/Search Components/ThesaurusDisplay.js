import ThesaurusWordInfo from "./ThesaurusWordInfo";

export default function ThesaurusDisplay(props){
    let key = 0;
    const { thesaurusInfo } = props; // gets wordinfo from props

    return <>
    {thesaurusInfo.map((item) => { // maps through each item and passes info and key to Theasaurus word info
        key++
        return <ThesaurusWordInfo wordInfo={item} key={key}/>
    })}
    </>
}