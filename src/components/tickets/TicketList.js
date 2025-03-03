import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"
export const TicketList = ( { searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect ( () => {
        const searchedTickets = tickets.filter(ticket => ticket.description.startsWith(searchTermState))
        setFiltered(searchedTickets)
    },
    [searchTermState]
    )


    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        }, [emergency])
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json()).then((ticketArray) => { setTickets(ticketArray) })

        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketsArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketsArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        }, 
        [ openOnly ]
    )
    return <>
        {
            honeyUserObject.staff
            ? <>
                <button onClick={() => { setEmergency(true) }}>Emergencies Only</button>
                <button onClick={() => { setEmergency(false) }}>All Tickets</button>
            </>
            : <>
            <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
            <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
            </>
        }

        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header><footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}