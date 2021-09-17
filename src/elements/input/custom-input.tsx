
export function CustomInput(props) {

  function handleChange(event) {
    props.setValue(event.target.value);
  }

    return(
        <div className={'custom-input-container'}>
          <span>{props.label}: </span>
          <input value={props.value} onChange={handleChange}/>
        </div>
    )
}
