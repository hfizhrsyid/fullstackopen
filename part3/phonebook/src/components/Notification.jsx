const Notification = ({ name, status }) => {
    if (name === null) {
        return null
    }

    if (status) {
        return (
            <div className="notification successful">
                <p>{name}</p>
            </div>
        )
    }

    return (
        <div className="notification failed">
            <p>{name}</p>
        </div>
    )
}

export default Notification