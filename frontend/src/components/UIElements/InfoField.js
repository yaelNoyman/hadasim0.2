import React from "react";
import './InfoField.css';

export const InfoField = ({ label, value }) => {
    return (
        <div className="infoField-field">
            <h3>{label} </h3>
            <div>{value}</div>
        </div>
    )
}