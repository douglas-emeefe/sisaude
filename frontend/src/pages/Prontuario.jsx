import React, { useState } from "react";
import "../styles/Prontuario.css";

const Prontuario = () => {
    const [activeTab, setActiveTab] = useState("dadosPessoais");
    const [dataNascimento, setDataNascimento] = useState("");
    const [idade, setIdade] = useState("");
    const [sexo, setSexo] = useState("");
    const [residente, setResidente] = useState("");
    const [raca, setRaca] = useState("");
    const [etnia, setEtnia] = useState("");

    // Estados de documentos
    const [cpf, setCpf] = useState("");
    const [sus, setSus] = useState("");
    const [cpfValido, setCpfValido] = useState(true);

    // --- Funções de cálculo de idade ---
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

    // --- Funções de formatação ---
    const formatCPF = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, "$1.$2");
        if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
        return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    };

    const formatSUS = (value) => {
        const digits = value.replace(/\D/g, "");
        if (digits.length <= 11) {
            // Pode ser CPF
            return formatCPF(digits);
        } else {
            // SUS antigo
            const susDigits = digits.slice(0, 15);
            const groups = susDigits.match(/.{1,4}/g);
            return groups ? groups.join(" ") : "";
        }
    };

    // --- Função de validação de CPF ---
    const validarCPF = (cpf) => {
        const digits = cpf.replace(/\D/g, "");
        if (digits.length !== 11) return false;
        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(digits.charAt(i)) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;
        if (resto !== parseInt(digits.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(digits.charAt(i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;
        if (resto !== parseInt(digits.charAt(10))) return false;

        return true;
    };

    const handleCpfChange = (e) => {
        const valor = e.target.value;
        const formatted = formatCPF(valor);
        setCpf(formatted);
        setCpfValido(validarCPF(formatted));
        // Se o SUS estiver vazio, preenche automaticamente com o mesmo número
        if (!sus) setSus(formatted);
    };

    const handleSusChange = (e) => {
        const valor = e.target.value;
        const digits = valor.replace(/\D/g, "");

        let formatted;
        if (digits.length <= 11) {
            // SUS digitado como CPF
            formatted = formatCPF(digits);
            setSus(formatted);

            // Atualiza o CPF somente se não estiver digitado pelo usuário
            if (!cpf || cpf === sus) {
                setCpf(formatted);
                setCpfValido(validarCPF(formatted));
            }
        } else {
            // SUS antigo
            const susDigits = digits.slice(0, 15);
            const groups = susDigits.match(/.{1,4}/g);
            formatted = groups ? groups.join(" ") : "";
            setSus(formatted);
            // Não toca no CPF
        }
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
                        {/* Dados Pessoais existentes */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>NOME COMPLETO DO PACIENTE</label>
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

                            <div className="form-group">
                                <label>PROFISSÃO</label>
                                <input type="text" placeholder="Digite a profissão" />
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
                                        MASCULINO
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="feminino"
                                            checked={sexo === "feminino"}
                                            onChange={(e) => setSexo(e.target.value)}
                                        />{" "}
                                        FEMININO
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="outros"
                                            checked={sexo === "outros"}
                                            onChange={(e) => setSexo(e.target.value)}
                                        />{" "}
                                        OUTROS
                                    </label>
                                </div>
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
                                        SIM
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="residente"
                                            value="nao"
                                            checked={residente === "nao"}
                                            onChange={(e) => setResidente(e.target.value)}
                                        />{" "}
                                        NÃO
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>RAÇA/COR</label>
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="raca"
                                            value="branco"
                                            checked={raca === "branco"}
                                            onChange={(e) => setRaca(e.target.value)}
                                        />{" "}
                                        Branco
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="raca"
                                            value="preto"
                                            checked={raca === "preto"}
                                            onChange={(e) => setRaca(e.target.value)}
                                        />{" "}
                                        Preto
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="raca"
                                            value="pardo"
                                            checked={raca === "pardo"}
                                            onChange={(e) => setRaca(e.target.value)}
                                        />{" "}
                                        Pardo
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="raca"
                                            value="amarelo"
                                            checked={raca === "amarelo"}
                                            onChange={(e) => setRaca(e.target.value)}
                                        />{" "}
                                        Amarelo
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="raca"
                                            value="indigena"
                                            checked={raca === "indigena"}
                                            onChange={(e) => setRaca(e.target.value)}
                                        />{" "}
                                        Indígena
                                    </label>
                                </div>
                            </div>
                            {raca === "indigena" && (
                                <div className="form-group">
                                    <label>QUAL ETNIA</label>
                                    <input
                                        type="text"
                                        placeholder="Informe a etnia"
                                        value={etnia}
                                        onChange={(e) => setEtnia(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === "documentos" && (
                    <>
                        <div className="form-row">
                            <div className="form-group">
                                <label>CPF</label>
                                <input
                                    type="text"
                                    placeholder="Digite o CPF"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                />
                                {!cpfValido && cpf.length > 0 && (
                                    <span style={{ color: "red", fontSize: "0.8rem" }}>
                                        CPF inválido
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label>CARTÃO DO SUS</label>
                                <input
                                    type="text"
                                    placeholder="Digite o cartão do SUS"
                                    value={sus}
                                    onChange={handleSusChange}
                                />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "endereco" && (
                    <>
                        <div className="form-row">
                            <div className="form-group">
                                <label>RUA</label>
                                <input type="text" placeholder="Digite o nome da Rua" />
                            </div>

                            <div className="form-group">
                                <label>NÚMERO</label>
                                <input type="text" placeholder="Digite o Número da Residêndia" />
                            </div>
                            <div className="form-group">
                                <label>BAIRRO</label>
                                <input type="text" placeholder="Digite o nome do Bairro" />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="cadastrar-btn"
                            onClick={() => alert("Paciente cadastrado!")}
                        >
                            Cadastrar Paciente
                        </button>
                    </>
                )}

                {/* <button
          type="button"
          className="cadastrar-btn"
          onClick={() => alert("Paciente cadastrado!")}
        >
          Cadastrar Paciente
        </button> */}
            </form>
        </div>
    );
};

export default Prontuario;