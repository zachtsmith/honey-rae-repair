import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState({})

    useEffect(
        () => {
        fetch (`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(response => response.json())
        .then((data) => {
            const singleEmployee = data[0]
            updateEmployee(singleEmployee)
        })
        }, 
        [employeeId]
    )
    return <section className="employee" >
    <header className="employee_header">{employee?.user?.name}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Pay Rate: {employee.rate}</div>
    <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets.</footer>
</section>
}