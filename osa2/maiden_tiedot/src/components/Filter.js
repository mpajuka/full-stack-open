const Filter = (props) => {
    return (
      <div>
        find countries<input value={props.filter} onChange={props.eventHandler}/>
      </div> 
    )
}

export default Filter