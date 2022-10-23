


function ClickableLetter(props){

    return (
        <button className={"LetterBox "+(props.used?"used":"")} id={props.id} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default ClickableLetter