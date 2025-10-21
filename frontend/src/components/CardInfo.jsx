import React from "react";
import "../styles/ScreenMain.css";

export default function CardInfo({ titulo, valor, cor }) {
    return (
        <div className="card-info" style={{ backgroundColor: cor }}>
            <h4>{titulo}</h4>
            <p>{valor}</p>
        </div>
    );
}
