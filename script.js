// CONFIGURAÇÕES DO NEGÓCIO
const MEU_WHATSAPP = "+55 (21) 976703419"; 

// BANCO DE DADOS DE PRODUTOS (Com links de imagens)
// DICA: Você pode usar links de imagens do Instagram da loja ou do Google Fotos
const produtos = [
    { 
        nome: "Açaí Premium", 
        desc: "Com leite em pó, morango e granola.", 
        preco: "22,00", 
        clima: "quente",
        imagem: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&q=80"
    },
    { 
        nome: "Suco de Laranja 500ml", 
        desc: "100% natural e super gelado.", 
        preco: "12,00", 
        clima: "quente",
        imagem: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80"
    },
    { 
        nome: "Chocolate Quente Belga", 
        desc: "Cremoso, com raspas de chocolate.", 
        preco: "15,00", 
        clima: "frio",
        imagem: "https://images.unsplash.com/photo-1544787210-2827443cb69b?w=500&q=80"
    },
    { 
        nome: "Sopa de Mandioca", 
        desc: "Receita caseira com carne desfiada.", 
        preco: "25,90", 
        clima: "frio",
        imagem: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    pegarLocalizacao();
});

function pegarLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => buscarClima(pos.coords.latitude, pos.coords.longitude),
            () => buscarClima(-23.55, -46.63) // São Paulo como padrão
        );
    }
}

async function buscarClima(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        const temp = data.current_weather.temperature;
        montarVitrine(temp);
    } catch (e) {
        montarVitrine(25); 
    }
}

function montarVitrine(temp) {
    const lista = document.getElementById('lista-produtos');
    const status = document.getElementById('status-clima');
    const loading = document.getElementById('loading');
    
    if(loading) loading.style.display = 'none';
    
    const tipoClima = temp > 22 ? "quente" : "frio";
    
    status.innerHTML = `🌡️ ${temp}°C | Vitrine de Hoje`;

    const filtrados = produtos.filter(p => p.clima === tipoClima);
    
    lista.innerHTML = ""; // Limpa antes de renderizar
    
    filtrados.forEach(p => {
        const msg = window.encodeURIComponent(`Olá! Quero pedir o ${p.nome}`);
        lista.innerHTML += `
            <div class="card">
                <img src="${p.imagem}" alt="${p.nome}" class="produto-img">
                <div class="info">
                    <h3>${p.nome}</h3>
                    <p>${p.desc}</p>
                    <div class="footer-card">
                        <span class="price">R$ ${p.preco}</span>
                        <a href="https://wa.me/${MEU_WHATSAPP}?text=${msg}" class="btn-whats">PEDIR</a>
                    </div>
                </div>
            </div>
        `;
    });
}
￼Enter
