// Dados do jogo por nível de dificuldade
const palavrasBiblicas = {
    facil: {
        "Personagens": [
            { palavra: "JESUS", dica: "O Salvador do mundo" },
            { palavra: "MARIA", dica: "Mãe de Jesus" },
            { palavra: "JOSE", dica: "Pai terreno de Jesus" },
            { palavra: "NOE", dica: "Construiu a arca" },
            { palavra: "DAVI", dica: "Rei que venceu Golias" },
            { palavra: "ANA", dica: "Mãe de Samuel" },
            { palavra: "EVA", dica: "Primeira mulher" },
            { palavra: "ADAO", dica: "Primeiro homem" }
        ],
        "Objetos": [
            { palavra: "ARCA", dica: "Salvou Noé do dilúvio" },
            { palavra: "CRUZ", dica: "Onde Jesus morreu por nós" },
            { palavra: "PEDRA", dica: "Davi usou para vencer Golias" },
            { palavra: "VARA", dica: "Moisés usou para abrir o mar" },
            { palavra: "HARPA", dica: "Davi tocava para Saul" },
            { palavra: "COROA", dica: "Jesus recebeu de espinhos" }
        ],
        "Virtudes": [
            { palavra: "AMOR", dica: "O maior mandamento" },
            { palavra: "FE", dica: "Confiança em Deus" },
            { palavra: "PAZ", dica: "Jesus nos dá" },
            { palavra: "JOY", dica: "Alegria em inglês" }
        ]
    },
    medio: {
        "Personagens": [
            { palavra: "ABRAAO", dica: "Pai da fé" },
            { palavra: "MOISES", dica: "Libertou o povo do Egito" },
            { palavra: "DANIEL", dica: "Foi jogado na cova dos leões" },
            { palavra: "PEDRO", dica: "Pescador que seguiu Jesus" },
            { palavra: "PAULO", dica: "Apóstolo dos gentios" },
            { palavra: "SAMUEL", dica: "Profeta desde criança" },
            { palavra: "ELISEU", dica: "Discípulo de Elias" },
            { palavra: "JOSUE", dica: "Sucessor de Moisés" }
        ],
        "Lugares": [
            { palavra: "BELEM", dica: "Cidade onde Jesus nasceu" },
            { palavra: "NAZARE", dica: "Cidade onde Jesus cresceu" },
            { palavra: "EGITO", dica: "Terra onde José governou" },
            { palavra: "JORDAO", dica: "Rio onde Jesus foi batizado" },
            { palavra: "GALILEA", dica: "Região onde Jesus ministrou" },
            { palavra: "CAANA", dica: "Jesus fez seu primeiro milagre" }
        ],
        "Objetos": [
            { palavra: "MANTO", dica: "José ganhou de seu pai" },
            { palavra: "CAJADO", dica: "Bastão de pastor" },
            { palavra: "TEMPLO", dica: "Casa de Deus" },
            { palavra: "ALTAR", dica: "Local de sacrifício" },
            { palavra: "TUMBA", dica: "Jesus ressuscitou dela" }
        ]
    },
    dificil: {
        "Personagens": [
            { palavra: "NABUCODONOSOR", dica: "Rei da Babilônia" },
            { palavra: "MELQUISEDEQUE", dica: "Rei e sacerdote de Salém" },
            { palavra: "BARTOLOMEU", dica: "Um dos doze apóstolos" },
            { palavra: "ZACARIAS", dica: "Pai de João Batista" },
            { palavra: "NICODEMOS", dica: "Fariseu que visitou Jesus à noite" },
            { palavra: "BARNABE", dica: "Companheiro missionário de Paulo" }
        ],
        "Lugares": [
            { palavra: "JERUSALEM", dica: "Cidade santa" },
            { palavra: "CALVARIO", dica: "Monte onde Jesus morreu" },
            { palavra: "GETSEMANI", dica: "Jardim onde Jesus orou" },
            { palavra: "MACEDONIA", dica: "Paulo teve visão deste lugar" },
            { palavra: "ANTIOQUIA", dica: "Onde os discípulos foram chamados cristãos" }
        ],
        "Conceitos": [
            { palavra: "RESSURREICAO", dica: "Jesus venceu a morte" },
            { palavra: "RECONCILIACAO", dica: "Deus nos perdoou" },
            { palavra: "SANTIFICACAO", dica: "Processo de ser santo" },
            { palavra: "JUSTIFICACAO", dica: "Ser declarado justo por Deus" },
            { palavra: "REGENERACAO", dica: "Nascer de novo" }
        ]
    }
};

// Variáveis do jogo
let palavraAtual = '';
let categoriaAtual = '';
let dicaAtual = '';
let nivelAtual = 'facil';
let letrasReveladas = [];
let letrasErradas = [];
let erros = 0;
let pontos = 0;
let maxErros = 6;
const partesCorpo = ['cabeca', 'corpo', 'braco-esq', 'braco-dir', 'perna-esq', 'perna-dir'];

// Pontuação por nível
const pontosPorNivel = {
    facil: { base: 10, bonus: 30 },
    medio: { base: 20, bonus: 60 },
    dificil: { base: 30, bonus: 100 }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    verificarNivelURL();
    inicializarJogo();
    criarTeclado();
    criarSeletorNivel();
});

// Verificar nível na URL
function verificarNivelURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const nivel = urlParams.get('nivel');
    if (nivel && ['facil', 'medio', 'dificil'].includes(nivel)) {
        nivelAtual = nivel;
    }
}

// Criar seletor de nível
function criarSeletorNivel() {
    const header = document.querySelector('.game-controls');
    const seletorHTML = `
        <div class="nivel-selector">
            <label for="nivel-select">Nível:</label>
            <select id="nivel-select" onchange="mudarNivel(this.value)">
                <option value="facil" ${nivelAtual === 'facil' ? 'selected' : ''}>🟢 Fácil</option>
                <option value="medio" ${nivelAtual === 'medio' ? 'selected' : ''}>🟡 Médio</option>
                <option value="dificil" ${nivelAtual === 'dificil' ? 'selected' : ''}>🔴 Difícil</option>
            </select>
        </div>
    `;
    header.insertAdjacentHTML('beforeend', seletorHTML);
    
    // Ajustar max erros por nível
    ajustarDificuldade();
}

// Mudar nível
function mudarNivel(novoNivel) {
    nivelAtual = novoNivel;
    ajustarDificuldade();
    novoJogo();
}

// Ajustar dificuldade
function ajustarDificuldade() {
    switch(nivelAtual) {
        case 'facil':
            maxErros = 8; // Mais chances
            break;
        case 'medio':
            maxErros = 6; // Padrão
            break;
        case 'dificil':
            maxErros = 4; // Menos chances
            break;
    }
}

// Função principal de inicialização
function inicializarJogo() {
    escolherPalavra();
    resetarJogo();
    exibirPalavra();
    atualizarInterface();
}

// Escolher palavra por nível
function escolherPalavra() {
    const dadosNivel = palavrasBiblicas[nivelAtual];
    const categorias = Object.keys(dadosNivel);
    categoriaAtual = categorias[Math.floor(Math.random() * categorias.length)];
    
    const palavrasCategoria = dadosNivel[categoriaAtual];
    const palavraObj = palavrasCategoria[Math.floor(Math.random() * palavrasCategoria.length)];
    
    palavraAtual = palavraObj.palavra;
    dicaAtual = palavraObj.dica;
    
    console.log(`Nível: ${nivelAtual}, Palavra: ${palavraAtual}`);
}

// Resetar variáveis do jogo
function resetarJogo() {
    letrasReveladas = [];
    letrasErradas = [];
    erros = 0;
    
    // Esconder partes do corpo
    partesCorpo.forEach(parte => {
        const elemento = document.getElementById(parte);
        if (elemento) elemento.style.display = 'none';
    });
    
    // Limpar letras erradas
    const letrasErradasDiv = document.getElementById('letras-erradas');
    if (letrasErradasDiv) letrasErradasDiv.innerHTML = '';
    
    // Resetar teclado
    document.querySelectorAll('.tecla').forEach(tecla => {
        tecla.className = 'tecla';
        tecla.disabled = false;
    });
    
    // Esconder modal
    document.getElementById('modal-resultado').classList.add('hidden');
}

// Criar teclado virtual
function criarTeclado() {
    const teclado = document.getElementById('teclado');
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    if (!teclado) return;
    
    teclado.innerHTML = '';
    
    for (let letra of letras) {
        const tecla = document.createElement('button');
        tecla.className = 'tecla';
        tecla.textContent = letra;
        tecla.onclick = () => tentarLetra(letra);
        teclado.appendChild(tecla);
    }
}

// Exibir palavra com espaços
function exibirPalavra() {
    const display = document.getElementById('palavra-display');
    if (!display) return;
    
    display.innerHTML = '';
    
    for (let i = 0; i < palavraAtual.length; i++) {
        const letra = palavraAtual[i];
        const letraBox = document.createElement('div');
        
        if (letra === ' ') {
            letraBox.className = 'espaco';
        } else {
            letraBox.className = 'letra-box';
            if (letrasReveladas.includes(letra)) {
                letraBox.textContent = letra;
                letraBox.classList.add('revelada');
            }
        }
        
        display.appendChild(letraBox);
    }
}

// Atualizar interface
function atualizarInterface() {
    const categoriaEl = document.getElementById('categoria');
    const dicaEl = document.getElementById('dica');
    const errosEl = document.getElementById('erros');
    const pontosEl = document.getElementById('pontos');
    
    if (categoriaEl) categoriaEl.textContent = categoriaAtual;
    if (dicaEl) dicaEl.textContent = dicaAtual;
    if (errosEl) errosEl.textContent = erros;
    if (pontosEl) pontosEl.textContent = pontos;
    
    // Atualizar indicador de nível
    const nivelIndicador = document.querySelector('.nivel-atual');
    if (nivelIndicador) {
        const nivelTexto = {
            facil: '🟢 Fácil',
            medio: '🟡 Médio', 
            dificil: '🔴 Difícil'
        };
        nivelIndicador.textContent = nivelTexto[nivelAtual];
    }
}

// Tentar uma letra
function tentarLetra(letra) {
    const teclas = document.querySelectorAll('.tecla');
    let teclaAtual = null;
    
    // Encontrar a tecla correta
    teclas.forEach(tecla => {
        if (tecla.textContent === letra) {
            teclaAtual = tecla;
        }
    });
    
    // Verificar se a tecla já foi usada
    if (!teclaAtual || teclaAtual.disabled) return;
    
    teclaAtual.disabled = true;
    teclaAtual.classList.add('usada');
    
    if (palavraAtual.includes(letra)) {
        // Letra correta
        letrasReveladas.push(letra);
        teclaAtual.classList.add('correta');
        
        // Calcular pontos baseado no nível
        const pontosBase = pontosPorNivel[nivelAtual].base;
        pontos += Math.max(pontosBase - erros, 1);
        
        // Tocar som de acerto
        tocarSom('acerto');
        
        // Verificar vitória
        if (verificarVitoria()) {
            setTimeout(() => {
                vitoria();
            }, 500);
        }
    } else {
        // Letra incorreta
        letrasErradas.push(letra);
        teclaAtual.classList.add('incorreta');
        erros++;
        
        // Mostrar parte do corpo
        if (erros <= maxErros && erros <= partesCorpo.length) {
            const parte = document.getElementById(partesCorpo[erros - 1]);
            if (parte) parte.style.display = 'block';
        }
        
        // Adicionar letra errada à exibição
        adicionarLetraErrada(letra);
        
        // Tocar som de erro
        tocarSom('erro');
        
        // Verificar derrota
        if (erros >= maxErros) {
            setTimeout(() => {
                derrota();
            }, 500);
        }
    }
    
    exibirPalavra();
    atualizarInterface();
}

// Adicionar letra errada à exibição
function adicionarLetraErrada(letra) {
    const container = document.getElementById('letras-erradas');
    if (!container) return;
    
    const letraElement = document.createElement('span');
    letraElement.className = 'letra-errada';
    letraElement.textContent = letra;
    container.appendChild(letraElement);
}

// Verificar vitória
function verificarVitoria() {
    for (let letra of palavraAtual) {
        if (letra !== ' ' && !letrasReveladas.includes(letra)) {
            return false;
        }
    }
    return true;
}

// Função de vitória
function vitoria() {
    // Bonus por vitória baseado no nível
    const bonusVitoria = pontosPorNivel[nivelAtual].bonus;
    pontos += bonusVitoria;
    
    // Bonus por poucos erros
    if (erros === 0) pontos += bonusVitoria; // Perfeito!
    else if (erros <= Math.floor(maxErros/3)) pontos += Math.floor(bonusVitoria/2); // Muito bom!
    else if (erros <= Math.floor(maxErros/2)) pontos += Math.floor(bonusVitoria/4); // Bom!
    
    tocarSom('vitoria');
    adicionarEfeitoVitoria();
    
    const nivelTexto = {
        facil: 'Fácil',
        medio: 'Médio',
        dificil: 'Difícil'
    };
    
    mostrarModal(
        'Parabéns! 🎉',
        `Você descobriu a palavra no nível ${nivelTexto[nivelAtual]}!`,
        '🎉',
        '#4CAF50'
    );
}

// Função de derrota
function derrota() {
    tocarSom('derrota');
    
    mostrarModal(
        'Que pena! 😢',
        'Não foi desta vez, mas você pode tentar novamente!',
        '😢',
        '#F44336'
    );
}

// Mostrar modal de resultado
function mostrarModal(titulo, mensagem, emoji, cor) {
    const modal = document.getElementById('modal-resultado');
    if (!modal) return;
    
    document.getElementById('resultado-titulo').textContent = titulo;
    document.getElementById('resultado-titulo').style.color = cor;
    document.getElementById('resultado-mensagem').textContent = mensagem;
    document.getElementById('resultado-emoji').textContent = emoji;
    document.getElementById('palavra-final').textContent = palavraAtual;
    document.getElementById('pontuacao-final').textContent = pontos;
    
    modal.classList.remove('hidden');
}

// Novo jogo
function novoJogo() {
    inicializarJogo();
}

// Tocar sons
function tocarSom(tipo) {
    const audio = document.getElementById(`audio-${tipo}`);
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Som bloqueado:', e));
    }
}

// Suporte a teclado físico
document.addEventListener('keydown', function(event) {
    const letra = event.key.toUpperCase();
    if (letra >= 'A' && letra <= 'Z') {
        tentarLetra(letra);
    } else if (event.key === 'Enter') {
        novoJogo();
    }
});

// Efeito de vitória
function adicionarEfeitoVitoria() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            criarConfete();
        }, i * 100);
    }
}

function criarConfete() {
    const confete = document.createElement('div');
    confete.style.position = 'fixed';
    confete.style.left = Math.random() * 100 + 'vw';
    confete.style.top = '-10px';
    confete.style.width = '8px';
    confete.style.height = '8px';
    confete.style.backgroundColor = ['#FFD700', '#FF6347', '#4CAF50', '#2196F3', '#FF69B4'][Math.floor(Math.random() * 5)];
    confete.style.zIndex = '9999';
    confete.style.borderRadius = '50%';
    confete.style.animation = 'cair 3s linear forwards';
    
    document.body.appendChild(confete);
    
    setTimeout(() => {
        confete.remove();
    }, 3000);
}

// Adicionar CSS para confetes
const style = document.createElement('style');
style.textContent = `
    @keyframes cair {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .nivel-selector {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: 20px;
    }
    
    .nivel-selector label {
        color: #2E8B57;
        font-weight: 600;
    }
    
    .nivel-selector select {
        padding: 8px 15px;
        border: 2px solid #2E8B57;
        border-radius: 20px;
        background: white;
        color: #2E8B57;
        font-weight: 600;
        cursor: pointer;
    }
    
    .nivel-selector select:focus {
        outline: none;
        box-shadow: 0 0 10px rgba(46, 139, 87, 0.3);
    }
`;
document.head.appendChild(style);