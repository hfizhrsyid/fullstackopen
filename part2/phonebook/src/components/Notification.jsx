const Notification = ({ name }) => {
    if (name === null) {
        return null
    }

    return (
        <div className="successful">
            <p>{name}</p>
        </div>
    )
}

export default Notification