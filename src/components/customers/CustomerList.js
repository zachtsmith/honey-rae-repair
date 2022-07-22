import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customer.css"
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    useEffect(
        () => {
             fetch(`http://localhost:8088/customers?_expand=user`)
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        },
        []
    )
// console.log(customers)
    return <article className="customers">
    {
    customers.map(customer => 
    <Customer key={`customer==${customer.id}`} id={customer.id} name={customer.user.name} address={customer.address} phoneNumber={customer.phoneNumber} />
    )
}
</article>
}