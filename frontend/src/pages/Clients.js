import React, { useEffect, useState } from "react";
import ClientsList from "./ClientMainView/ClientsList";
import { Button } from '../components/FormElements/Button'
import { useHistory } from "react-router-dom";

export const CLIENTS = [
    {
        name: "yael biton",
        id: "123456",
        addres: "bb ben 3",
        birthday: "2013-01-08",
        phone: "456",
        mobilePhone: "1321452"
    },
    {
        name: "racheli perfect",
        id: "dfdfdf",
        addres: "bbb 3",
        birthday: "1.2.3",
        phone: "456",
        mobilePhone: "ddddd"
    }
]

export const CoronaSick = [
    {
        id: "123456",
        dateOfPositive: "4.5.6",
        dateOfHealthy: "5.6.3"

    },
    {
        id: "dfdfdf",
        dateOfPositive: "4.5.6",
        dateOfHealthy: "5.6.3"

    }
]
export const VaccineInfo = [
    {
        id: "123456",
        dateOfVaccine: "1.2.3",
        company: "fizer"
    },
    {
        id: "123456",
        dateOfVaccine: "1.5.3",
        company: "fizer"
    }
]

export const Clients = () => {
    const history = useHistory();
    const addClientHabdler = () => {
        history.push("/addClient")

    }
    const [clients, setClients] = useState([]);
    useEffect(() => {
        fetch('localhost:5000/api/clients/')
            .then(res => res.json())
            .then(data => setClients([...data.clients]))

    }, [])
    return (
        <div>
            <button onClick={addClientHabdler}>create client</button>
            <ClientsList item={CLIENTS}></ClientsList>

        </div>
    )
};
