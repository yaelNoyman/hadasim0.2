import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CLIENTS, CoronaSick, VaccineInfo } from "../Clients";
import { InfoField } from "../../components/UIElements/InfoField";

import './ClientInfo.css';

const ClientInfo = () => {
    const [coronaInfo, setCoronaInfo] = useState({});
    const [vaccines, setVaccines] = useState([]);

    const clientId = useParams().clientId;
    const client = CLIENTS.filter(c => c.id === clientId)[0];

    useEffect(() => {
        //check if corona
        const corona = CoronaSick.filter(c => (
            c.id === clientId
        ))
        setCoronaInfo(corona[0]);
        const vaccines = VaccineInfo.filter(v => (
            v.id === clientId
        ))
        setVaccines(vaccines);
    }, []);


    return (
        <div className="all-page-detailes">
            <div className="ClientInfo-title">{client.name} Detailes </div>

            <div className="all-details">
                <div className="client-info">
                    {Object.entries(client).map(f => (
                        <InfoField label={f[0]} value={f[1]}></InfoField>
                    ))}
                </div>
                <div className="corona-info">
                    {coronaInfo ?
                        <div>
                            Corona:
                            < h4 >{coronaInfo.dateOfPositive} date of possitive corona answer </h4>

                            < h4 >{coronaInfo.dateOfHealthy} date of recovery </h4>

                        </div>
                        :
                        <h3> no corona found</h3>
                    }
                    {vaccines ?
                        <div>
                            {vaccines.map(vaccine => (
                                <div>
                                    <h3>Date of vaccine : {vaccine.dateOfVaccine}</h3>
                                    <h3>Company: {vaccine.company}</h3>
                                </div>
                            ))}
                        </div>
                        :
                        <h3>No vaccines Info</h3>
                    }

                </div>
            </div>
        </div >

    )
}

export default ClientInfo; 