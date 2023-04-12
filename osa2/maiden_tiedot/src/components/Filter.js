const Filter = (props) => {
    return (
      <div>
        find countries&nbsp;<input value={props.filter} onChange={props.eventHandler}/>
      </div> 
    )
}

export default Filter