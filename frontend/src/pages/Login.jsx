import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../images/logo-hrl.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.mensagem || "Erro ao fazer login");
                return;
            }

            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Erro:", error);
            setErro("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <h1 className="system-name">SISAUDE</h1>
                <p className="system-desc">Sistema de Fichas Ambulatoriais</p>
            </div>

            <div className="login-right">
                <div className="login-box">
                    <img src={logo} alt="Logo SISAUDE" className="logo" />
                    <h2>Bem-vindo</h2>
                    <p className="subtitle">Faça login para acessar o sistema</p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Usuário</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu Usuário"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        {erro && <p className="erro">{erro}</p>}

                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
