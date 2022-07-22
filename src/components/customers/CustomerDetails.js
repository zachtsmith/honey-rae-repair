import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
        fetch (`http://localhost:8088/customers?_expand=user=${customerId}`)
        .then(response => response.json())
        .then((data) => {
            const singleCustomer = data[0]
            updateCustomer(singleCustomer)
        })
        }, 
        [customerId]
    )
    console.log(customer)
    return <section className="customer" >
    <header className="customer_header">Name: {customer?.user?.name}</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Phone Number: {customer.phoneNumber}</div>
    <div>Address: {customer.address}</div>
    <footer className="customer_footer">This customer currently has {customer?.serviceTickets?.length} tickets.</footer>
</section>
}