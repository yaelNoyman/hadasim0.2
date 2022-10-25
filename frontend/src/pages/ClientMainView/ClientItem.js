import React from "react";
import './ClientItem.css'
import { useHistory } from "react-router-dom";
import Card from "../../components/UIElements/Card";
import Button from "../../components/FormElements/Button";


const ClientItem = props => {
    const history = useHistory();

    const onClientClicked = () => {
        //nav to Client Info with the id
        history.push(`/ClientInfo/${props.client.id}`)

    }
    const onClientDelete = () => {
        alert("you are about to delete a client!")
        //send delete to the DB
        try {
            const result = fetch(`http://localhost:5000/api/client/deleteClient/${props.client.id}`, {
                method: 'DELETE',
                headers: {
                    'Connect-Type': 'application/json',
                    "Content-Type": "text/plain"
                },
                mode: 'no-cors',
            }).then(function (response) {
                return response.json();
            }
            )
            // const r = result.body;

        } catch (eee) {
            console.log("got error!")
        }
    }
    const onEditClick = () => {
        history.push(`/updateClient/${props.client.id}`)
    }
    return (
        // <NavLink to={`/ClientInfo/${props.client.id}`}>
        <tr>
            {Object.entries(props.client).map(field => (
                <td onClick={onClientClicked} >{field[1]}</td>
            ))}

            <td>
                {/* <a href={`/updateClient/${props.client.id}`}>edit</a> */}
                <button onClick={onEditClick}>edit</button>
                <button onClick={onClientClicked}>show</button>
                <button onClick={onClientDelete}>Delete</button>

            </td>


        </tr >




    )
};

export default ClientItem;