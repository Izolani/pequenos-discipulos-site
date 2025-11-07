// Importar versículos anuais
// (Se estiver usando módulos, senão apenas certifique-se que o arquivo seja carregado antes)
// Variáveis globais
let currentAudio = null;
let isPlaying = false;

// Versículos para rotação
const versiculos = [
    {
        texto: "Deixai vir a mim as criancinhas e não as impeçais, porque das tais é o Reino de Deus.",
        referencia: "Marcos 10:14"
    },
    {
        texto: "Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele.",
        referencia: "Provérbios 22:6"
    },
    {
        texto: "Jesus disse: Eu sou o caminho, a verdade e a vida.",
        referencia: "João 14:6"
    },
    {
        texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
        referencia: "João 3:16"
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initSplashScreen();
    initMenuNavigation();
    initAudioPlayer();
    rotateVersiculo();
    
    // Rotacionar versículo diariamente
setInterval(rotateVersiculo, 24 * 60 * 60 * 1000); // 24 horas
});

// Splash Screen
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const splashAudio = document.getElementById('splash-audio');
    
    // Configurar áudio da vinheta
    if (splashAudio) {
        splashAudio.volume = 0.3;
        splashAudio.play().catch(e => console.log('Autoplay bloqueado'));
    }
    
    // Remover splash após 4 segundos
    setTimeout(() => {
        splashScreen.style.animation = 'fadeOut 1s ease-out forwards';
        
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.animation = 'fadeInUp 1s ease-out';
        }, 1000);
    }, 4000);
}

// Navegação do Menu
function initMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
        
        // Adicionar efeito sonoro ao hover
        item.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    });
}

// Navegação entre páginas
function navigateToPage(page) {
    playClickSound();
    
    // Adicionar animação de saída
    document.body.style.animation = 'fadeOut 0.3s ease-out';
    
    setTimeout(() => {
        window.location.href = `pages/${page}.html`;
    }, 300);
}

// Player de Áudio
function initAudioPlayer() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const progressBar = document.querySelector('.progress');
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    if (volumeBtn) {
        volumeBtn.addEventListener('click', toggleMute);
    }
}

// Controles de áudio
function togglePlayPause() {
    if (currentAudio) {
        if (isPlaying) {
            currentAudio.pause();
            document.getElementById('play-pause-btn').textContent = '▶️';
        } else {
            currentAudio.play();
            document.getElementById('play-pause-btn').textContent = '⏸️';
        }
        isPlaying = !isPlaying;
    }
}

function toggleMute() {
    if (currentAudio) {
        currentAudio.muted = !currentAudio.muted;
        const volumeBtn = document.getElementById('volume-btn');
        volumeBtn.textContent = currentAudio.muted ? '��' : '��';
    }
}

// Rotação de versículos
function rotateVersiculo() {
    const versiculoTexto = document.getElementById('versiculo-texto');
    const versiculoRef = document.getElementById('versiculo-referencia');
    
    if (versiculoTexto && versiculoRef) {
        // Usar a nova função dos 365 versículos
        const versiculoHoje = obterVersiculoDoDia();
        
        // Animação de fade
        versiculoTexto.style.opacity = '0';
        versiculoRef.style.opacity = '0';
        
        setTimeout(() => {
            versiculoTexto.textContent = `"${versiculoHoje.texto}"`;
            versiculoRef.textContent = versiculoHoje.referencia;
            versiculoTexto.style.opacity = '1';
            versiculoRef.style.opacity = '1';
        }, 300);
    }
}// Efeitos sonoros
function playHoverSound() {
    const audio = new Audio('assets/audio/hover-sound.mp3');
    audio.volume = 0.1;
    audio.play().catch(e => console.log('Som bloqueado'));
}

function playClickSound() {
    const audio = new Audio('assets/audio/click-sound.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Som bloqueado'));
}

// Funções utilitárias
function showAudioPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) {
        audioPlayer.classList.remove('hidden');
    }
}

function hideAudioPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) {
        audioPlayer.classList.add('hidden');
    }
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

document.head.appendChild(style);

