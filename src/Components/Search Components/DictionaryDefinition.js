import DefinitionText from "./DefinitionText"

export default function DictionaryDefinition(props){
    const {info} = props
    let key = 0
   
    return <>
    {info.map((item) => {
        key++
        return <DefinitionText  content={item} key={key}/>
    })}
    </>
}