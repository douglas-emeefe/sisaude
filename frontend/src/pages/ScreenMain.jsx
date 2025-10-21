import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CardInfo from "../components/CardInfo";
import ChartAtendimentos from "../components/ChartAtendimentos";
import "../styles/ScreenMain.css";

export default function ScreenMain() {
    const [usuario, setUsuario] = useState("Dr. João Silva");
    const [dados, setDados] = useState({
        atendimentosHoje: 0,
        pacientesCadastrados: 0,
        consultasEmAndamento: 0,
    });

    useEffect(() => {
        // Simulação de dados (pode conectar com backend depois)
        setTimeout(() => {
            setDados({
                atendimentosHoje: 12,
                pacientesCadastrados: 356,
                consultasEmAndamento: 4,
            });
        }, 1000);
    }, []);

    return (
        <div className="dashboard-container">
            <Header usuario={usuario} />

            <h2 className="dashboard-title">Painel Geral</h2>

            <div className="cards-container">
                <CardInfo titulo="Atendimentos Hoje" valor={dados.atendimentosHoje} cor="#3b82f6" />
                <CardInfo titulo="Pacientes Cadastrados" valor={dados.pacientesCadastrados} cor="#10b981" />
                <CardInfo titulo="Consultas em Andamento" valor={dados.consultasEmAndamento} cor="#f59e0b" />
            </div>

            <div className="chart-container">
                <h3 className="chart-title">Resumo de Atendimentos</h3>
                <ChartAtendimentos />
            </div>
        </div>
    );
}
