import DefinitionText from "./DefinitionText"

export default function DictionaryDefinition(props){
    const {info} = props
   
    return <>
    {info.map((item) => {
      
        return <DefinitionText  content={item}/>
    })}
    </>
}