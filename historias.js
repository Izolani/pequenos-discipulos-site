// Dados das histórias
const historiasData = {
    'jesus-criancas': {
        titulo: 'Jesus e as Criancinhas',
        paginas: [
            {
                texto: 'Era uma vez, em um lugar muito especial, onde Jesus estava ensinando as pessoas sobre o amor de Deus...',
                ilustracao: '👶'
            },
            {
                texto: 'Muitas mamães e papais trouxeram suas criancinhas para Jesus abençoar...',
                ilustracao: '👨‍👩‍👧‍👦'
            },
            {
                texto: 'Mas os discípulos acharam que Jesus estava muito ocupado e tentaram mandar as crianças embora...',
                ilustracao: '🚫'
            },
            {
                texto: 'Jesus ficou triste com isso e disse: "Deixai vir a mim as criancinhas!"',
                ilustracao: '✝️'
            },
            {
                texto: 'E Jesus abençoou cada criancinha com muito amor e carinho. Ele ama todas as crianças!',
                ilustracao: '🙏'
            }
        ]
    },
    'noe-arca': {
        titulo: 'Noé e a Arca',
        paginas: [
            {
                texto: 'Há muito tempo, Deus viu que as pessoas estavam fazendo coisas ruins...',
                ilustracao: '🌍'
            },
            {
                texto: 'Mas Noé era um homem bom que obedecia a Deus...',
                ilustracao: '👨'
            },
            {
                texto: 'Deus pediu para Noé construir uma arca muito grande...',
                ilustracao: '🚢'
            },
            {
                texto: 'Noé colocou sua família e dois de cada animal na arca...',
                ilustracao: '🦁🐘🐰'
            },
            {
                texto: 'Choveu muito, mas todos na arca ficaram seguros com Deus!',
                ilustracao: '🌧️'
            }
        ]
    },
    'davi-golias': {
        titulo: 'Davi e Golias',
        paginas: [
            {
                texto: 'Davi era um jovem pastor que cuidava das ovelhinhas...',
                ilustracao: '🐑'
            },
            {
                texto: 'Um gigante chamado Golias estava assustando o povo de Deus...',
                ilustracao: '👹'
            },
            {
                texto: 'Davi confiou em Deus e disse que ia enfrentar o gigante...',
                ilustracao: '🗿'
            },
            {
                texto: 'Com apenas uma pedra e uma funda, Davi venceu Golias...',
                ilustracao: '🎯'
            },
            {
                texto: 'Deus ajudou Davi porque ele confiou no Senhor!',
                ilustracao: '🙌'
            }
        ]
    },
    'daniel-leoes': {
        titulo: 'Daniel na Cova dos Leões',
        paginas: [
            {
                texto: 'Daniel era um homem que orava a Deus todos os dias...',
                ilustracao: '🙏'
            },
            {
                texto: 'Pessoas más fizeram uma lei proibindo orar a Deus...',
                ilustracao: '📜'
            },
            {
                texto: 'Daniel continuou orando porque amava a Deus...',
                ilustracao: '❤️'
            },
            {
                texto: 'Jogaram Daniel na cova com leões famintos...',
                ilustracao: '🦁'
            },
            {
                texto: 'Mas Deus enviou um anjo para proteger Daniel!',
                ilustracao: '👼'
            }
        ]
    },
    'jonas-baleia': {
        titulo: 'Jonas e a Baleia',
        paginas: [
            {
                texto: 'Deus pediu para Jonas ir à cidade de Nínive...',
                ilustracao: '🏙️'
            },
            {
                texto: 'Mas Jonas teve medo e fugiu de navio...',
                ilustracao: '⛵'
            },
            {
                texto: 'Deus enviou uma grande tempestade...',
                ilustracao: '⛈️'
            },
            {
                texto: 'Jonas foi jogado ao mar e uma baleia o engoliu...',
                ilustracao: '🐋'
            },
            {
                texto: 'Dentro da baleia, Jonas orou e Deus o perdoou!',
                ilustracao: '🙏'
            }
        ]
    },
    'nascimento-jesus': {
        titulo: 'O Nascimento de Jesus',
        paginas: [
            {
                texto: 'Maria era uma jovem que amava muito a Deus...',
                ilustracao: '👩'
            },
            {
                texto: 'Um anjo apareceu e disse que ela teria um bebê especial...',
                ilustracao: '👼'
            },
            {
                texto: 'José e Maria viajaram para Belém...',
                ilustracao: '🐴'
            },
            {
                texto: 'Jesus nasceu em uma manjedoura, cercado de amor...',
                ilustracao: '👶'
            },
            {
                texto: 'Os anjos cantaram: "Glória a Deus nas alturas!"',
                ilustracao: '⭐'
            }
        ]
    }
};

// Variáveis globais
let historiaAtual = null;
let paginaAtual = 0;

// Função para abrir história - CORRIGIDA
function abrirHistoria(historiaId) {
    console.log('Tentando abrir história:', historiaId);
    
    // Verificar se a história existe
    if (!historiasData[historiaId]) {
        console.error('História não encontrada:', historiaId);
        alert('História não encontrada: ' + historiaId);
        return;
    }
    
    historiaAtual = historiasData[historiaId];
    paginaAtual = 0;
    
    console.log('História carregada:', historiaAtual.titulo);
    
    // Verificar se o modal existe
    const modal = document.getElementById('modal-historia');
    if (!modal) {
        console.error('Modal não encontrado!');
        alert('Erro: Modal da história não encontrado!');
        return;
    }
    
    // Mostrar modal
    modal.classList.remove('hidden');
    
    // Atualizar título
    const tituloElement = document.getElementById('historia-titulo');
    if (tituloElement) {
        tituloElement.textContent = historiaAtual.titulo;
    }
    
    // Carregar primeira página
    carregarPagina();
}

// Carregar página da história - CORRIGIDA
function carregarPagina() {
    if (!historiaAtual || paginaAtual >= historiaAtual.paginas.length) {
        console.error('Erro ao carregar página');
        return;
    }
    
    const pagina = historiaAtual.paginas[paginaAtual];
    console.log('Carregando página:', paginaAtual + 1, pagina);
    
    // Atualizar ilustração
    const ilustracaoElement = document.getElementById('ilustracao-imagem');
    if (ilustracaoElement) {
        ilustracaoElement.textContent = pagina.ilustracao;
    }
    
    // Atualizar texto
    const textoElement = document.getElementById('texto-historia');
    if (textoElement) {
        textoElement.innerHTML = `<p>${pagina.texto}</p>`;
    }
    
    // Atualizar contador de páginas
    const paginaElement = document.getElementById('pagina-atual');
    if (paginaElement) {
        paginaElement.textContent = `${paginaAtual + 1} / ${historiaAtual.paginas.length}`;
    }
    
    // Atualizar botões de navegação
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProximo = document.getElementById('btn-proximo');
    
    if (btnAnterior) {
        btnAnterior.disabled = paginaAtual === 0;
    }
    
    if (btnProximo) {
        btnProximo.disabled = paginaAtual === historiaAtual.paginas.length - 1;
    }
}

// Navegação - CORRIGIDA
function proximaPagina() {
    if (!historiaAtual) return;
    
    if (paginaAtual < historiaAtual.paginas.length - 1) {
        paginaAtual++;
        carregarPagina();
        console.log('Próxima página:', paginaAtual + 1);
    }
}

function paginaAnterior() {
    if (!historiaAtual) return;
    
    if (paginaAtual > 0) {
        paginaAtual--;
        carregarPagina();
        console.log('Página anterior:', paginaAtual + 1);
    }
}

// Fechar história
function fecharHistoria() {
    const modal = document.getElementById('modal-historia');
    if (modal) {
        modal.classList.add('hidden');
    }
    historiaAtual = null;
    paginaAtual = 0;
    console.log('História fechada');
}

// Controles de áudio (simulado)
function togglePlayPause() {
    const btn = document.getElementById('btn-play-pause');
    if (!btn) return;
    
    if (btn.textContent.includes('▶️')) {
        btn.textContent = '⏸️ Pausar';
        console.log('Reproduzindo história...');
        simularAudio();
    } else {
        btn.textContent = '▶️ Ouvir';
        console.log('História pausada');
    }
}

function simularAudio() {
    // Simular progresso do áudio
    const progress = document.getElementById('progress');
    if (!progress) return;
    
    let width = 0;
    const interval = setInterval(() => {
        width += 2;
        progress.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            const btn = document.getElementById('btn-play-pause');
            if (btn) {
                btn.textContent = '▶️ Ouvir';
            }
            progress.style.width = '0%';
        }
    }, 100);
}

function mudarVelocidade() {
    const btn = document.getElementById('btn-velocidade');
    if (!btn) return;
    
    const velocidades = ['1x', '1.25x', '1.5x', '0.75x'];
    const atual = btn.textContent;
    const index = velocidades.indexOf(atual);
    const proximo = velocidades[(index + 1) % velocidades.length];
    btn.textContent = proximo;
    console.log('Velocidade alterada para:', proximo);
}

// Filtrar categorias - CORRIGIDA
function filtrarCategoria(categoria) {
    console.log('Filtrando categoria:', categoria);
    
    // Atualizar botões ativos
    document.querySelectorAll('.btn-categoria').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Marcar botão clicado como ativo
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Filtrar cards
    const cards = document.querySelectorAll('.historia-card');
    cards.forEach(card => {
        const categoriaCard = card.getAttribute('data-categoria') || '';
        
        if (categoria === 'todas' || categoriaCard.includes(categoria)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    console.log(`Filtro aplicado: ${categoria}. Cards visíveis:`, 
        document.querySelectorAll('.historia-card[style*="block"]').length);
}

// Inicialização - CORRIGIDA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Histórias Bíblicas carregadas!');
    console.log('Histórias disponíveis:', Object.keys(historiasData));
    
    // Verificar se todos os elementos necessários existem
    const elementos = [
        'modal-historia',
        'historia-titulo',
        'ilustracao-imagem',
        'texto-historia',
        'pagina-atual',
        'btn-anterior',
        'btn-proximo'
    ];
    
    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        if (!elemento) {
            console.warn(`Elemento não encontrado: ${id}`);
        } else {
            console.log(`Elemento encontrado: ${id}`);
        }
    });
    
    // Adicionar event listeners para os botões de categoria
    document.querySelectorAll('.btn-categoria').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.textContent.split(' ')[1]?.toLowerCase() || 'todas';
            filtrarCategoria(categoria);
        });
    });
});

// Função global para debug
window.debugHistorias = function() {
    console.log('=== DEBUG HISTÓRIAS ===');
    console.log('Histórias disponíveis:', Object.keys(historiasData));
    console.log('História atual:', historiaAtual);
    console.log('Página atual:', paginaAtual);
    console.log('Modal existe:', !!document.getElementById('modal-historia'));
    console.log('======================');
};