import React, { useState } from "react";
import "../styles/Prontuario.css";

const Prontuario = () => {
    const [activeTab, setActiveTab] = useState("dadosPessoais");
    const [dataNascimento, setDataNascimento] = useState("");
    const [idade, setIdade] = useState("");
    const [indigena, setIndigena] = useState(false);
    const [sexo, setSexo] = useState("");
    const [residente, setResidente] = useState("");
    const [raca, setRaca] = useState({
        preto: false,
        pardo: false,
        amarelo: false,
        indigena: false,
    });

    const calcularIdade = (data) => {
        const hoje = new Date();
        const nascimento = new Date(data);
        let anos = hoje.getFullYear() - nascimento.getFullYear();
        let meses = hoje.getMonth() - nascimento.getMonth();
        let dias = hoje.getDate() - nascimento.getDate();

        if (meses < 0 || (meses === 0 && dias < 0)) {
            anos--;
            meses = (meses + 12) % 12;
        }

        if (dias < 0) {
            const ultimoDiaMesAnterior = new Date(
                hoje.getFullYear(),
                hoje.getMonth(),
                0
            ).getDate();
            dias += ultimoDiaMesAnterior;
            meses--;
            if (meses < 0) meses += 12;
        }

        return `${anos} anos, ${meses} meses, ${dias} dias`;
    };

    const handleNascimentoChange = (e) => {
        const valor = e.target.value;
        setDataNascimento(valor);
        setIdade(valor ? calcularIdade(valor) : "");
    };

    const handleRacaChange = (e) => {
        const { name, checked } = e.target;
        setRaca((prev) => ({ ...prev, [name]: checked }));
    };

    return (
        <div className="prontuario-container">
            <h2>Prontuário do Paciente</h2>

            {/* Botões das abas */}
            <div className="tabs">
                <button
                    className={activeTab === "dadosPessoais" ? "active" : ""}
                    onClick={() => setActiveTab("dadosPessoais")}
                >
                    Dados Pessoais
                </button>

                <button 
                    className={activeTab === "documentos" ? "active" : ""}
                    onClick={() => setActiveTab("documentos")}
                >
                    Documentos
                </button>

                <button 
                    className={activeTab === "endereco" ? "active" : ""}
                    onClick={() => setActiveTab("endereco")}
                >
                    Endereço
                </button>
            </div>

            <form className="prontuario-form">
                {activeTab === "dadosPessoais" && (
                    <>
                        <div className="form-row">
                            <div className="form-group">
                                <label>NOME COMPLETO</label>
                                <input type="text" placeholder="Digite o nome completo" />
                            </div>

                            <div className="form-group">
                                <label>NOME DA MÃE</label>
                                <input type="text" placeholder="Digite o nome da mãe" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>NOME DO ACOMPANHANTE</label>
                                <input type="text" placeholder="Digite o nome do acompanhante" />
                            </div>

                            
                        </div>

                        <div className="form-row">
                            

                            <div className="form-group">
                                <label>SEXO</label>
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="masculino"
                                            checked={sexo === "masculino"}
                                            onChange={(e) => setSexo(e.target.value)}
                                        />{" "}
                                        M
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="feminino"
                                            checked={sexo === "feminino"}
                                            onChange={(e) => setSexo(e.target.value)}
                                        />{" "}
                                        F
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="outros"
                                            checked={sexo === "outros"}
                                            onChange={(e) => setSexo(e.target.value)}
                                        />{" "}
                                        Outros
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>DATA DE NASCIMENTO</label>
                                <input
                                    type="date"
                                    value={dataNascimento}
                                    onChange={handleNascimentoChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>IDADE</label>
                                <input type="text" value={idade} readOnly />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>PROFISSÃO</label>
                                <input type="text" placeholder="Digite a profissão" />
                            </div>

                            <div className="form-group">
                                <label>RAÇA/COR</label>
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="preto"
                                            checked={raca.preto}
                                            onChange={handleRacaChange}
                                        />{" "}
                                        Preto
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="pardo"
                                            checked={raca.pardo}
                                            onChange={handleRacaChange}
                                        />{" "}
                                        Pardo
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="amarelo"
                                            checked={raca.amarelo}
                                            onChange={handleRacaChange}
                                        />{" "}
                                        Amarelo
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="indigena"
                                            checked={raca.indigena}
                                            onChange={handleRacaChange}
                                        />{" "}
                                        Indígena
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>INDÍGENA</label>
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="indigena"
                                            value="sim"
                                            checked={indigena === true}
                                            onChange={() => setIndigena(true)}
                                        />{" "}
                                        Sim
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="indigena"
                                            value="nao"
                                            checked={indigena === false}
                                            onChange={() => setIndigena(false)}
                                        />{" "}
                                        Não
                                    </label>
                                </div>

                                {indigena && (
                                    <>
                                        <label>QUAL ETNIA</label>
                                        <input type="text" placeholder="Informe a etnia" />
                                    </>
                                )}
                            </div>

                            <div className="form-group">
                                <label>RESIDENTE DO MUNICÍPIO</label>
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="residente"
                                            value="sim"
                                            checked={residente === "sim"}
                                            onChange={(e) => setResidente(e.target.value)}
                                        />{" "}
                                        Sim
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="residente"
                                            value="nao"
                                            checked={residente === "nao"}
                                            onChange={(e) => setResidente(e.target.value)}
                                        />{" "}
                                        Não
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "documentos" && (
                    <>
                        <div className="form-row">
                            <div className="form-group">
                                <label>CPF</label>
                                <input type="text" placeholder="Digite o CPF" />
                            </div>

                            <div className="form-group">
                                <label>CARTÃO DO SUS</label>
                                <input type="text" placeholder="Digite o cartão do SUS" />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "endereco" && (
                    <>
                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>ENDEREÇO (RUA, NÚMERO, BAIRRO)</label>
                                <input type="text" placeholder="Digite o endereço" />
                            </div>
                        </div>
                    </>
                )}

                <button
                    type="button"
                    className="cadastrar-btn"
                    onClick={() => alert("Paciente cadastrado!")}
                >
                    Cadastrar Paciente
                </button>
            </form>
        </div>
    );
};

export default Prontuario;
