function Letter(props){
    console.log(props)
    return (
        <div className="LetterBox">
            {props.value}
        </div>
    )
}

export default Letter