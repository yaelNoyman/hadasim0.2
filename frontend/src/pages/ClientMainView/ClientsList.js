import userEvent from "@testing-library/user-event";
import React from "react";
import ClientItem from "./ClientItem";
import Card from "../../components/UIElements/Card";
import './ClientsList.css';


const tableTiltels = ["name", "id", "addres", "date of birth", "phone number", "mobile phone", "functions"]

const ClientsList = props => {
    if (props.item.length === 0) {
        return (<div className="center">
            <Card>
                <hs>No Clients found.</hs>
            </Card>
        </div>)

    }
    return (
        <table>
            <thead>
                <tr>
                    {tableTiltels.map(title => (
                        <th>{title}</th>
                    ))}
                </tr>
            </thead>
            {props.item.map(client => (
                <ClientItem key={client.id} client={client} ></ClientItem>
            ))}
        </table>
    )

};

export default ClientsList;