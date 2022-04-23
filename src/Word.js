import Letter from "./Letter";
import "./Word.css";

let Word = props => (
    <div className="word" id={props.id}>
        {props.value.split("").map(letter =>(<Letter value={letter} />))}
    </div>
    )

export default Word