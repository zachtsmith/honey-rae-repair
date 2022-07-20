import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employee.css"
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    useEffect(
        () => {
             fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray) => {
                setEmployees(employeeArray)
            })
        },
        []
    )

    return <article className="employees">
    {
    employees.map(employee => 
    <Employee key={`employee==${employee.id}`} id={employee.id} name={employee.name} email={employee.email} />
    )
}
</article>
}