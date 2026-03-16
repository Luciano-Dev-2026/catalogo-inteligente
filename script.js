// ==========================================
// 1. CONFIGURAÇÕES DO CLIENTE (Mude aqui)
// ==========================================
const CONFIG = {
    nomeLoja: "NOME DA LOJA AQUI",
    whatsapp: "5521976703419", // DDD + Número
    temperaturaLimite: 22, // Abaixo disso é "frio", acima é "quente"
    corPrincipal: "#ff4757" // Cor da marca do cliente
};

// ==========================================
// 2. BANCO DE PRODUTOS DO CLIENTE
// ==========================================
const produtos = [
    // PRODUTOS PARA DIAS QUENTES
    { nome: "Produto Calor 1", desc: "Descrição...", preco: "10,00", clima: "quente", img: "link-da-foto" },
    { nome: "Produto Calor 2", desc: "Descrição...", preco: "15,00", clima: "quente", img: "link-da-foto" },
    
    // PRODUTOS PARA DIAS FRIOS
    { nome: "Produto Frio 1", desc: "Descrição...", preco: "20,00", clima: "frio", img: "link-da-foto" },
    { nome: "Produto Frio 2", desc: "Descrição...", preco: "25,00", clima: "frio", img: "link-da-foto" }
];

// ==========================================
// 3. MOTOR DO SISTEMA (Não precisa mexer)
// ==========================================
async function iniciarSistema() {
    document.title = CONFIG.nomeLoja;
    document.querySelector('h1').innerText = CONFIG.nomeLoja;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => buscarClima(pos.coords.latitude, pos.coords.longitude),
            () => buscarClima(-23.55, -46.63) // Padrão SP
        );
    }
}

async function buscarClima(lat, lon) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        renderizar(data.current_weather.temperature);
    } catch (e) { renderizar(25); }
}

function renderizar(temp) {
    const lista = document.getElementById('lista-produtos');
    const status = document.getElementById('status-clima');
    const tipoClima = temp > CONFIG.temperaturaLimite ? "quente" : "frio";
    
    status.innerHTML = `🌡️ ${temp}°C | Sugestões de Hoje`;
    
    const filtrados = produtos.filter(p => p.clima === tipoClima);
    lista.innerHTML = filtrados.map(p => `
        <div class="card">
            <img src="${p.img}" class="produto-img">
            <div class="info">
                <h3>${p.nome}</h3>
                <p>${p.desc}</p>
                <div class="footer-card">
                    <span class="price">R$ ${p.preco}</span>
                    <a href="https://wa.me/${CONFIG.whatsapp}?text=Quero o ${p.nome}" class="btn-whats">PEDIR</a>
                </div>
            </div>
        </div>
    `).join('');
}

iniciarSistema();
