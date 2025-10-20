const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchPacientes() {
    const res = await fetch(`${API_URL}/pacientes`);
    return res.json();
}

export async function criarAtendimento(data) {
    const res = await fetch(`${API_URL}/atendimentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}