const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="error">
                <p>{message}</p>
            </div>
        )
    }
}

export default Notification