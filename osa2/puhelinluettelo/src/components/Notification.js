const Notification = ({ message }) => {
    if(message === null) {
        return null
    }

    return (
        <div className="modification-success">
            {message}
        </div>
    )
}

export default Notification