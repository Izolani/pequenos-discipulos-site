// Sistema de áudio avançado para Louvor Infantil
class LouvorAudioSystem {
    constructor() {
        this.musicaAtual = null;
        this.tocando = false;
        this.volume = 0.7;
        this.velocidade = 1;
        this.playlist = [];
        this.indiceAtual = 0;
        this.modoKaraoke = false;
        this.tempoAtual = 0;
        this.duracao = 0;
        this.audioContext = null;
        this.intervaloReproducao = null;
        
        this.init();
    }
    
    init() {
        console.log('🎵 Sistema de Louvor Avançado inicializado');
        this.criarAudioContext();
        this.configurarEventos();
        this.criarPlaylist();
    }
    
    criarAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎧 Contexto de áudio criado com sucesso');
        } catch (error) {
            console.warn('⚠️ Contexto de áudio não suportado:', error);
        }
    }
    
    criarPlaylist() {
        this.playlist = Object.keys(musicasData);
        console.log('📋 Playlist criada com', this.playlist.length, 'músicas');
    }
    
    configurarEventos() {
        document.addEventListener('DOMContentLoaded', () => {
            this.atualizarInterface();
            this.configurarControles();
        });
    }
    
    configurarControles() {
        // Event listeners para controles de volume
        const controleVolume = document.getElementById('controle-volume');
        if (controleVolume) {
            controleVolume.addEventListener('input', (e) => {
                this.volume = e.target.value / 100;
                this.mostrarNotificacao(`🔊 Volume: ${e.target.value}%`);
            });
        }
    }
    
    selecionarMusica(musicaId) {
        console.log('🎵 Selecionando música:', musicaId);
        
        if (!musicasData[musicaId]) {
            console.error('❌ Música não encontrada:', musicaId);
            this.mostrarAlerta('Música não encontrada!', 'error');
            return;
        }
        
        this.musicaAtual = musicasData[musicaId];
        this.indiceAtual = this.playlist.indexOf(musicaId);
        
        // Atualizar interface principal
        this.atualizarInterfacePrincipal();
        
        // Reset do player
        this.tempoAtual = 0;
        this.atualizarProgresso();
        
        // Destacar música selecionada
        this.destacarMusicaSelecionada(musicaId);
        
        console.log('✅ Música selecionada:', this.musicaAtual.titulo);
        this.mostrarNotificacao(`🎵 Selecionada: ${this.musicaAtual.titulo}`);
    }
    
    atualizarInterfacePrincipal() {
        const elementos = {
            'musica-atual': this.musicaAtual.titulo,
            'artista-atual': this.musicaAtual.artista,
            'tempo-total': this.musicaAtual.duracao
        };
        
        Object.entries(elementos).forEach(([id, valor]) => {
            const elemento = document.getElementById(id);
            if (elemento) elemento.textContent = valor;
        });
        
        // Atualizar ícone do álbum
        const albumPlaceholder = document.querySelector('.album-placeholder');
        if (albumPlaceholder) {
            albumPlaceholder.textContent = this.musicaAtual.icon;
        }
    }
    
    destacarMusicaSelecionada(musicaId) {
        // Remover destaque anterior
        document.querySelectorAll('.musica-card').forEach(card => {
            card.classList.remove('selecionada');
        });
        
        // Adicionar destaque à música atual
        const cardAtual = document.querySelector(`[onclick*="${musicaId}"]`);
        if (cardAtual) {
            cardAtual.classList.add('selecionada');
        }
    }
    
    tocarMusica(musicaId) {
        this.selecionarMusica(musicaId);
        if (!this.tocando) {
            this.togglePlayPause();
        }
    }
    
    togglePlayPause() {
        if (!this.musicaAtual) {
            this.mostrarAlerta('Selecione uma música primeiro!', 'info');
            return;
        }
        
        this.tocando = !this.tocando;
        this.atualizarBotoesPlay();
        
        if (this.tocando) {
            console.log('▶️ Reproduzindo:', this.musicaAtual.titulo);
            this.iniciarReproducao();
            this.mostrarNotificacao(`▶️ Tocando: ${this.musicaAtual.titulo}`);
        } else {
            console.log('⏸️ Pausado');
            this.pararReproducao();
            this.mostrarNotificacao('⏸️ Música pausada');
        }
    }
    
    atualizarBotoesPlay() {
        const botoes = [
            'btn-play-pause',
            'btn-play-main'
        ];
        
        const icone = this.tocando ? '⏸️' : '▶️';
        
        botoes.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.textContent = icone;
        });
    }
    
    iniciarReproducao() {
        if (!this.musicaAtual) return;
        
        const duracao = this.converterDuracaoParaSegundos(this.musicaAtual.duracao);
        
        // Simular reprodução com efeitos visuais
        this.simularEfeitosVisuais();
        
        this.intervaloReproducao = setInterval(() => {
            if (!this.tocando) {
                clearInterval(this.intervaloReproducao);
                return;
            }
            
            this.tempoAtual += this.velocidade;
            this.atualizarProgresso();
            this.atualizarVisualizador();
            
            if (this.tempoAtual >= duracao) {
                this.finalizarMusica();
            }
        }, 1000);
    }
    
    pararReproducao() {
        if (this.intervaloReproducao) {
            clearInterval(this.intervaloReproducao);
            this.intervaloReproducao = null;
        }
        this.pararEfeitosVisuais();
    }
    
    simularEfeitosVisuais() {
        // Adicionar classe de animação ao álbum
        const albumArt = document.getElementById('album-art');
        if (albumArt) {
            albumArt.classList.add('tocando');
        }
        
        // Iniciar visualizador de áudio
        this.iniciarVisualizador();
    }
    
    pararEfeitosVisuais() {
        const albumArt = document.getElementById('album-art');
        if (albumArt) {
            albumArt.classList.remove('tocando');
        }
        this.pararVisualizador();
    }
    
    iniciarVisualizador() {
        // Criar barras de visualização de áudio
        const visualizador = document.getElementById('visualizador-audio');
        if (!visualizador) return;
        
        visualizador.innerHTML = '';
        
        for (let i = 0; i < 20; i++) {
            const barra = document.createElement('div');
            barra.className = 'barra-audio';
            barra.style.cssText = `
                width: 4px;
                background: linear-gradient(to top, #4CAF50, #81C784);
                margin: 0 1px;
                border-radius: 2px;
                transition: height 0.1s ease;
            `;
            visualizador.appendChild(barra);
        }
    }
    
    atualizarVisualizador() {
        const barras = document.querySelectorAll('.barra-audio');
        barras.forEach(barra => {
            const altura = Math.random() * 40 + 10;
            barra.style.height = altura + 'px';
        });
    }
    
    pararVisualizador() {
        const barras = document.querySelectorAll('.barra-audio');
        barras.forEach(barra => {
            barra.style.height = '5px';
        });
    }
    
    finalizarMusica() {
        this.pararReproducao();
        this.tocando = false;
        this.tempoAtual = 0;
        
        this.atualizarBotoesPlay();
        this.atualizarProgresso();
        
        this.mostrarNotificacao('🏁 Música finalizada');
        console.log('🏁 Música finalizada');
        
        // Auto-play próxima música após 2 segundos
        setTimeout(() => {
            this.proximaMusica();
        }, 2000);
    }
    
    musicaAnterior() {
        if (this.playlist.length === 0) return;
        
        this.indiceAtual = this.indiceAtual > 0 ? this.indiceAtual - 1 : this.playlist.length - 1;
        const novaMusica = this.playlist[this.indiceAtual];
        
        this.tocarMusica(novaMusica);
        console.log('⏮️ Música anterior:', novaMusica);
    }
    
    proximaMusica() {
        if (this.playlist.length === 0) return;
        
        this.indiceAtual = this.indiceAtual < this.playlist.length - 1 ? this.indiceAtual + 1 : 0;
        const novaMusica = this.playlist[this.indiceAtual];
        
        this.tocarMusica(novaMusica);
        console.log('⏭️ Próxima música:', novaMusica);
    }
    
    abrirKaraoke() {
        if (!this.musicaAtual) {
            this.mostrarAlerta('Selecione uma música primeiro!', 'warning');
            return;
        }
        
        this.modoKaraoke = !this.modoKaraoke;
        
        if (this.modoKaraoke) {
            this.mostrarModalKaraoke();
        } else {
            this.fecharModalKaraoke();
        }
    }
    
    mostrarModalKaraoke() {
        const modalHTML = `
            <div id="modal-karaoke" class="modal-karaoke">
                <div class="modal-content-karaoke">
                    <div class="karaoke-header">
                        <h2>🎤 Modo Karaokê</h2>
                        <div class="karaoke-controles-header">
                            <button onclick="louvorPlayer.alternarTela()" class="btn-tela-cheia">🖥️</button>
                            <button onclick="louvorPlayer.fecharModalKaraoke()" class="btn-fechar-karaoke">❌</button>
                        </div>
                    </div>
                    <div class="karaoke-body">
                        <div class="musica-info-karaoke">
                            <h3>${this.musicaAtual.titulo}</h3>
                            <p>${this.musicaAtual.artista}</p>
                        </div>
                        <div class="letra-container">
                            <div class="letra-karaoke" id="letra-karaoke">
                                ${this.gerarLetrasKaraoke()}
                            </div>
                        </div>
                        <div class="karaoke-controles">
                            <button onclick="louvorPlayer.togglePlayPause()" class="btn-karaoke-control">
                                ${this.tocando ? '⏸️ Pausar' : '▶️ Tocar'}
                            </button>
                            <button onclick="louvorPlayer.ajustarTom(-1)" class="btn-karaoke-control">🔽 Tom</button>
                            <button onclick="louvorPlayer.ajustarTom(1)" class="btn-karaoke-control">🔼 Tom</button>
                            <button onclick="louvorPlayer.alternarLetra()" class="btn-karaoke-control">📝 Letra</button>
                        </div>
                        <div class="karaoke-progress">
                            <div class="progress-bar-karaoke" onclick="louvorPlayer.buscarTempo(event)">
                                <div class="progress-karaoke" id="progress-karaoke"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.iniciarSincronizacaoLetra();
        console.log('🎤 Modal karaokê aberto');
    }
    
    gerarLetrasKaraoke() {
        if (!this.musicaAtual.letra) {
            return '<div class="letra-linha">🎵 Letra não disponível</div>';
        }
        
        return this.musicaAtual.letra.map((linha, index) => 
            `<div class="letra-linha" data-linha="${index}">${linha}</div>`
        ).join('');
    }
    
    iniciarSincronizacaoLetra() {
        if (!this.musicaAtual.letra) return;
        
        const duracao = this.converterDuracaoParaSegundos(this.musicaAtual.duracao);
        const tempoPorLinha = duracao / this.musicaAtual.letra.length;
        
        this.intervaloLetra = setInterval(() => {
            if (!this.tocando || !this.modoKaraoke) return;
            
            const linhaAtual = Math.floor(this.tempoAtual / tempoPorLinha);
            this.destacarLinhaAtual(linhaAtual);
        }, 500);
    }
    
    destacarLinhaAtual(indice) {
        document.querySelectorAll('.letra-linha').forEach((linha, i) => {
            linha.classList.toggle('ativa', i === indice);
        });
    }
    
    fecharModalKaraoke() {
        const modal = document.getElementById('modal-karaoke');
        if (modal) {
            modal.remove();
            this.modoKaraoke = false;
            if (this.intervaloLetra) {
                clearInterval(this.intervaloLetra);
            }
            console.log('🎤 Modal karaokê fechado');
        }
    }
    
    buscarTempo(event) {
        if (!this.musicaAtual) return;
        
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        
        const duracao = this.converterDuracaoParaSegundos(this.musicaAtual.duracao);
        this.tempoAtual = (percentage / 100) * duracao;
        
        this.atualizarProgresso();
        console.log('⏯️ Tempo alterado para:', this.formatarTempo(this.tempoAtual));
        this.mostrarNotificacao(`⏯️ ${this.formatarTempo(this.tempoAtual)}`);
    }
    
    atualizarProgresso() {
        if (!this.musicaAtual) return;
        
        const duracao = this.converterDuracaoParaSegundos(this.musicaAtual.duracao);
        const percentage = Math.min((this.tempoAtual / duracao) * 100, 100);
        
        // Atualizar barras de progresso
        const progressBars = ['progress-main', 'progress-karaoke'];
        progressBars.forEach(id => {
            const progress = document.getElementById(id);
            if (progress) progress.style.width = percentage + '%';
        });
        
        // Atualizar tempo atual
        const tempoAtualElement = document.getElementById('tempo-atual');
        if (tempoAtualElement) {
            tempoAtualElement.textContent = this.formatarTempo(this.tempoAtual);
        }
    }
    
    converterDuracaoParaSegundos(duracao) {
        const partes = duracao.split(':');
        return parseInt(partes[0]) * 60 + parseInt(partes[1]);
    }
    
    formatarTempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segs = Math.floor(segundos % 60);
        return `${minutos}:${segs.toString().padStart(2, '0')}`;
    }
    
    ajustarTom(direcao) {
        console.log('🎵 Ajustando tom:', direcao > 0 ? 'Subindo' : 'Descendo');
        this.mostrarNotificacao(`🎵 Tom ${direcao > 0 ? 'aumentado' : 'diminuído'}`);
    }
    
    mostrarNotificacao(mensagem) {
        const notificacao = document.createElement('div');
        notificacao.className = 'notificacao-louvor';
        notificacao.textContent = mensagem;
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4CAF50, #81C784);
            color: white;
            padding: 15px 20px;
            border-radius: 15px;
            z-index: 1002;
            font-family: 'Comic Neue', cursive;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notificacao);
        
        setTimeout(() => {
            notificacao.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notificacao.remove(), 300);
        }, 3000);
    }
    
    mostrarAlerta(mensagem, tipo = 'info') {
        const icones = {
            info: 'ℹ️',
            warning: '⚠️',
            error: '❌',
            success: '✅'
        };
        
        const cores = {
            info: '#2196F3',
            warning: '#FF9800',
            error: '#F44336',
            success: '#4CAF50'
        };
        
        const alerta = document.createElement('div');
        alerta.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 1003;
                text-align: center;
                max-width: 400px;
                border-left: 5px solid ${cores[tipo]};
                animation: modalEntrar 0.5s ease-out;
            ">
                <div style="font-size: 3rem; margin-bottom: 20px;">${icones[tipo]}</div>
                <p style="margin: 0 0 25px 0; color: #333; font-size: 1.2rem; line-height: 1.5;">${mensagem}</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: linear-gradient(45deg, ${cores[tipo]}, ${cores[tipo]}dd);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-family: 'Comic Neue', cursive;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: transform 0.3s ease;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">OK</button>
            </div>
        `;
        
        document.body.appendChild(alerta);
        
        setTimeout(() => {
            if (alerta.parentElement) {
                alerta.remove();
            }
        }, 8000);
    }
}

// Dados expandidos das músicas
const musicasData = {
    'jesus-me-ama': {
        titulo: 'Jesus Me Ama',
        artista: 'Ministério Infantil - Igreja Cristo Vive',
        duracao: '2:30',
        icon: '❤️',
        letra: [
            'Jesus me ama, disso eu sei',
            'A Bíblia assim me ensinou',
            'Pequeninos como eu',
            'Ele nos ama porque nos criou',
            'Sim, Jesus me ama',
            'Sim, Jesus me ama',
            'Sim, Jesus me ama',
            'A Bíblia assim me ensinou'
        ]
    },
    'meu-deus-grande': {
        titulo: 'Meu Deus é Grande',
        artista: 'Ministério Infantil - Igreja Cristo Vive',
        duracao: '3:15',
        icon: '🌟',
        letra: [
            'Meu Deus é grande, forte e poderoso',
            'Meu Deus é grande, Ele é vitorioso',
            'Meu Deus é grande, maior que os problemas',
            'Meu Deus é grande, maior que os gigantes',
            'Ele é o Rei dos reis',
            'Senhor dos senhores',
            'Meu Deus é grande',
            'Grande é o Senhor!'
        ]
    },
    'aleluia-criancas': {
        titulo: 'Aleluia das Crianças',
        artista: 'Ministério Infantil - Igreja Cristo Vive',
        duracao: '2:45',
        icon: '🙌',
        letra: [
            'Aleluia, aleluia, aleluia, aleluia',
            'Louvamos ao Senhor',
            'Aleluia, aleluia, aleluia, aleluia',
            'Com todo o coração',
            'Cantamos para Jesus',
            'Com alegria e louvor',
            'Aleluia, aleluia',
            'Glória ao nosso Senhor!'
        ]
    },
    'pai-nosso': {
        titulo: 'Pai Nosso Infantil',
        artista: 'Ministério Infantil - Igreja Cristo Vive',
        duracao: '3:00',
        icon: '🙏',
        letra: [
            'Pai nosso que estás nos céus',
            'Santificado seja o teu nome',
            'Venha o teu reino',
            'Seja feita a tua vontade',
            'Assim na terra como no céu',
            'O pão nosso de cada dia',
            'Nos dá hoje',
            'E perdoa as nossas ofensas'
        ]
    },
    'biblia-livro': {
        titulo: 'A Bíblia é o Livro',
        artista: 'Ministério Infantil - Igreja Cristo Vive',
        duracao: '2:20',
        icon: '📖',
        letra: [
            'A Bíblia é o livro que nos ensina',
            'Como viver para Jesus',
            'A Bíblia é o livro da verdade',
            'Que nos mostra o caminho da luz',
            'Palavra de Deus',
            'Lâmpada para os meus pés',
            'A Bíblia é vida',
            'Para quem nela crer'
        ]
    },
    'jesus-amigo': {
        titulo: 'Jesus é Meu Amigo',
        artista: 'Ministério Infantil - Igreja Cristo Vive',
        duracao: '2:50',
        icon: '👫',
        letra: [
            'Jesus é meu amigo querido',
            'Ele nunca me deixará',
            'Jesus é meu amigo fiel',
            'Para sempre me amará',
            'Quando estou triste',
            'Ele me consola',
            'Jesus é meu amigo',
            'O melhor de todos!'
        ]
    }
};

// Instância global do player
let louvorPlayer;

// Funções globais para compatibilidade
function selecionarMusica(musicaId) {
    louvorPlayer.selecionarMusica(musicaId);
}

function tocarMusica(musicaId) {
    louvorPlayer.tocarMusica(musicaId);
}

function togglePlayPause() {
    louvorPlayer.togglePlayPause();
}

function musicaAnterior() {
    louvorPlayer.musicaAnterior();
}

function proximaMusica() {
    louvorPlayer.proximaMusica();
}

function abrirKaraoke() {
    louvorPlayer.abrirKaraoke();
}

function modoKaraoke(musicaId) {
    louvorPlayer.selecionarMusica(musicaId);
    louvorPlayer.abrirKaraoke();
}

function buscarTempo(event) {
    louvorPlayer.buscarTempo(event);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    louvorPlayer = new LouvorAudioSystem();
    console.log('🎵 Sistema de Louvor Avançado - Igreja Cristo Vive carregado!');
    
    // Adicionar estilos CSS
    adicionarEstilosLouvor();
});

// Função para adicionar estilos CSS
function adicionarEstilosLouvor() {
    const estilos = `
        <style>
        /* Animações */
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes modalEntrar {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes pulsar {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Álbum tocando */
        .album-art.tocando {
            animation: pulsar 2s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(76, 175, 80, 0.5);
        }
        
        /* Música selecionada */
        .musica-card.selecionada {
            border: 3px solid #4CAF50 !important;
            box-shadow: 0 0 20px rgba(76, 175, 80, 0.3) !important;
            transform: scale(1.02) !important;
        }
        
        /* Modal Karaokê */
        .modal-karaoke {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            backdrop-filter: blur(10px);
        }
        
        .modal-content-karaoke {
            background: linear-gradient(135deg, #2E8B57, #4CAF50);
            border-radius: 25px;
            max-width: 900px;
            width: 95%;
            max-height: 90%;
            color: white;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        
        .karaoke-header {
            padding: 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid rgba(255,255,255,0.2);
            background: rgba(0,0,0,0.1);
        }
        
        .karaoke-header h2 {
            margin: 0;
            font-size: 1.8rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .karaoke-controles-header {
            display: flex;
            gap: 10px;
        }
        
        .btn-tela-cheia,
        .btn-fechar-karaoke {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 10px;
            border-radius: 50%;
            transition: all 0.3s;
            width: 45px;
            height: 45px;
        }
        
        .btn-tela-cheia:hover,
        .btn-fechar-karaoke:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }
        
        .karaoke-body {
            padding: 30px;
        }
        
        .musica-info-karaoke {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .musica-info-karaoke h3 {
            font-size: 2.2rem;
            margin: 0 0 10px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .musica-info-karaoke p {
            font-size: 1.3rem;
            opacity: 0.9;
            margin: 0;
        }
        
        .letra-container {
            background: rgba(0,0,0,0.3);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            min-height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .letra-karaoke {
            text-align: center;
            width: 100%;
        }
        
        .letra-linha {
            font-size: 1.6rem;
            margin: 15px 0;
            opacity: 0.5;
            transition: all 0.5s ease;
            line-height: 1.6;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        
        .letra-linha.ativa {
            opacity: 1;
            font-size: 2rem;
            font-weight: bold;
            color: #FFD700;
            transform: scale(1.1);
            text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        }
        
        .karaoke-controles {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin-bottom: 25px;
        }
        
        .btn-karaoke-control {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 15px 25px;
            border-radius: 30px;
            cursor: pointer;
            font-family: 'Comic Neue', cursive;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .btn-karaoke-control:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .karaoke-progress {
            margin-top: 20px;
        }
        
        .progress-bar-karaoke {
            width: 100%;
            height: 12px;
            background: rgba(255,255,255,0.2);
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            backdrop-filter: blur(10px);
        }
        
        .progress-karaoke {
            height: 100%;
            background: linear-gradient(90deg, #FFD700, #FFA500);
            width: 0%;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        /* Visualizador de áudio */
        #visualizador-audio {
            display: flex;
            align-items: end;
            justify-content: center;
            height: 60px;
            margin: 20px 0;
        }
        
        .barra-audio {
            height: 5px;
            animation: pulseAudio 0.5s ease-in-out infinite alternate;
        }
        
        @keyframes pulseAudio {
            0% { opacity: 0.6; }
            100% { opacity: 1; }
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
            .modal-content-karaoke {
                width: 98%;
                margin: 10px;
            }
            
            .karaoke-body {
                padding: 20px;
            }
            
            .musica-info-karaoke h3 {
                font-size: 1.8rem;
            }
            
            .letra-linha {
                font-size: 1.3rem;
            }
            
            .letra-linha.ativa {
                font-size: 1.6rem;
            }
            
            .karaoke-controles {
                flex-direction: column;
                align-items: center;
            }
            
            .btn-karaoke-control {
                width: 200px;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', estilos);
}