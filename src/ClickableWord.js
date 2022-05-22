import ClickableLetter from "./ClickableLetter";
import "./Word.css";

let ClickableWord = props => (
    <div className="word" id={props.id}>
        {props.value.map(({used,letter, id}, index) =>(<ClickableLetter value={letter} key={index} used={used} id={id} onClick={props.onClick} />))}
    </div>
    )

export default ClickableWord