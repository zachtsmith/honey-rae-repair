export const Employee = ({id, name, email}) => {
    return <section className="employee" >
            <div>Name: {name}</div>
            <div>Email: {email}</div>
        </section>
}