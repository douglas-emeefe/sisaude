import React from "react";
import "../styles/ScreenMain.css";

export default function Header({ usuario }) {
    return (
        <header className="header">
            <h1 className="header-logo">SISAUDE</h1>
            <div className="header-user">
                <span className="header-label">Usuário:</span> {usuario}
            </div>
        </header>
    );
}
