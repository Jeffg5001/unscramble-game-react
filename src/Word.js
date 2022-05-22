import { useEffect } from "react";
import Letter from "./Letter";
import "./Word.css";


let Word = props => {
    useEffect(()=>{if(props.onChange) props.onChange()})
    return (
    <div className="word" id={props.id}>
        {props.value.split("").map((letter, index) =>(<Letter value={letter} onClick={props.onClick} key={index}/>))}
    </div>
    )
}
    

export default Word