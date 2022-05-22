


function ClickableLetter(props){

    return (
        <div className={"LetterBox"+(props.used?"-used":"")} id={props.id} onClick={props.onClick}>
            {props.value}
        </div>
    )
}

export default ClickableLetter