import { Link } from "react-router-dom"

export const Customer = ({id, name, address, phoneNumber}) => {
    return <section className="customer" >
            <div>
                <Link to={`/customers/${id}`}>Name: {name}</Link>
            </div>
            <div>Address: {address}</div>
            <div>Phone Number: {phoneNumber}</div>
        </section>
}