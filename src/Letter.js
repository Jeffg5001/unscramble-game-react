function Letter(props){
    return (
        <div className={"LetterBox" + (props.type ? "-" + props.type : "")}>
            {props.value}
        </div>
    )
}

export default Letter