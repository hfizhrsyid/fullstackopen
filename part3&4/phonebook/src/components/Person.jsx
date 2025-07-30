const Person = (person) => {
    return (
        <li>
            {person.name} {person.number} 
            <button onClick={person.deleteMyPerson}>delete</button>
        </li>
    )
}

export default Person