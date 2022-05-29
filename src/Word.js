import { useEffect } from "react";
import Letter from "./Letter";
import "./Word.css";


let Word = ({onChange, value, onClick, id, type, className}) => {
    useEffect(()=>{if(onChange) onChange()}, [value, onChange])
    return (
    <div className={`word ${className||""}`} id={id}>
        {value.split("").map((letter, index) =>(<Letter type={type} value={letter} onClick={onClick} key={index}/>))}
    </div>
    )
}
    

export default Word