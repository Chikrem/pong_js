// Classe RAQUETE
class Raquete {
    constructor(x) {
        this.w = 10; // Largura da raquete
        this.h = 100; // Altura da raquete
        this.x = 10 + this.w; // Posição inicial no eixo x
        this.y = height / 2; // Posição inicial no eixo y
    }

    update() {
        // Faz a raquete seguir o mouse e limita a posição da raquete à tela
        this.y = mouseY;
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }

    desenha() {
        // Desenha a raquete com a imagem do jogador ou do computador
        if (this.x < width / 2) {
            image(jogadorImagem, this.x, this.y - this.h / 2, this.w, this.h);
        } else {
            image(computadorImagem, this.x, this.y - this.h / 2, this.w, this.h);
        }
    }
}

// Classe COMPUTADOR
class Computador {
    constructor(x) {
        this.w = 10; // Largura da raquete
        this.h = 100; // Altura da raquete
        this.x = width - this.w - 10; // Posição inicial no eixo x (oposta)
        this.y = height / 2; // Posição inicial no eixo y
    }

    update() {
        // Define a posição da raquete como a posição da bola com velocidade constante
        this.y = bola.y * 0.8;
        this.y = constrain(this.y, this.h / 2, height - this.h / 2); // Limita a posição da raquete à tela
    }

    desenha() {
        // Desenha a raquete com a imagem do jogador ou do computador
        if (this.x < width / 2) {
            image(jogadorImagem, this.x, this.y - this.h / 2, this.w, this.h);
        } else {
            image(computadorImagem, this.x, this.y - this.h / 2, this.w, this.h);
        }
    }
}

// Classe BOLA
class Bola {
    constructor() {
        this.r = 15; // Raio da bola
        this.reset(); // Inicializa a posição e velocidade da bola
        
    }

    reset() {
        // Define a posição inicial da bola no centro da tela
        this.x = width / 2; 
        this.y = height / 2; 
        // Define uma velocidade aleatória para a bola
        this.vx = Math.random() * 10 - 3; 
        this.vy = Math.random() * 10 - 3; 
    }

    update() {
        // Atualiza a posição da bola
        this.x += this.vx; 
        this.y += this.vy; 

        // Rotaciona a bola de acordo com a velocidade x e y
        this.angle = atan2(this.vy, this.vx);

        // Verifica colisão com as bordas laterais e reseta a bola
        if (this.x < this.r || this.x > width - this.r) {
            if (this.x < this.r) {
                pontosComputador++;
            } else {
                pontosJogador++;
            }
            golSom.play();
            falaPontos();
            this.reset();
        }
        // Verifica colisão com as bordas superior e inferior e inverte a direção
        if (this.y < this.r || this.y > height - this.r) { 
            this.vy *= -1; 
        }

        // Verifica colisão com a raquete do jogador e inverte a direção
        if (this.x - this.r < raquete1.x + raquete1.w / 2 
            && this.x + this.r > raquete1.x - raquete1.w / 2 
            && this.y - this.r < raquete1.y + raquete1.h / 2 
            && this.y + this.r > raquete1.y - raquete1.h / 2) {
            this.vx *= -1.1; 
            quicarSom.play();

        }

        // Verifica colisão com a raquete do computador e inverte a direção
        if (this.x - this.r < computador.x + computador.w / 2 
            && this.x + this.r > computador.x - computador.w / 2 
            && this.y - this.r < computador.y + computador.h / 2 
            && this.y + this.r > computador.y - computador.h / 2) {
            this.vx *= -1.1; 
            quicarSom.play();

        }
    }

    desenha() {   
        // Desenha a bola com a imagem correspondente, a bola rotaciona conforme a direção
        push();
        translate(this.x, this.y);
        rotate(frameCount / 5);
        image(bolaImagem, -this.r, -this.r, this.r * 2, this.r * 2);
        pop();
    }
}

let bola;
let raquete1;
let computador;
let fundoImagem;
let quicarSom;
let golSom;

let pontosJogador = 0;
let pontosComputador = 0;

function falaPontos() {
    // use speechapi
    if('speechSynthesis' in window) {
        let msg;
        if (pontosJogador > pontosComputador) {
            msg = new SpeechSynthesisUtterance('Ponto para o Jogador');
        } else {
            msg = new SpeechSynthesisUtterance('Ponto para o Computador');
        }
        window.speechSynthesis.speak(msg);
    }
}

function preload() {
    // Carrega as imagens dos elementos do jogo
    bolaImagem = loadImage('sprites/pong/bola.png');
    jogadorImagem = loadImage('sprites/pong/barra01.png');
    computadorImagem = loadImage('sprites/pong/barra02.png');
    fundoImagem = loadImage('sprites/pong/fundo2.png');
    quicarSom = loadSound('sound/446100__justinvoke__bounce.wav');
    golSom = loadSound('sound/274178__littlerobotsoundfactory__jingle_win_synth_02.wav');

}

function setup() {
    // Cria o canvas com largura 800 e altura 400
    createCanvas(800, 400); 
    // Cria as instâncias dos objetos do jogo
    bola = new Bola(); 
    raquete1 = new Raquete(20); 
    computador = new Computador(width - 20); 
}

function draw() {

    // Define as dimensões da imagem original
    let imgWidth = 800;
    let imgHeight = 400;
    // Calcula a proporção da imagem original
    let imgRatio = imgWidth / imgHeight;
    // Calcula a proporção da tela (canvas)
    let cnvRatio = width / height;
    // Inicializa as coordenadas e dimensões da imagem ajustada
    let imgX = 0;
    let imgY = 0;
    let imgW = width;
    let imgH = height;

    // Ajusta as dimensões da imagem para manter a proporção correta
    if (cnvRatio > imgRatio) {
        // Se a proporção da tela for maior que a da imagem, ajusta a altura da imagem
        imgH = imgWidth / cnvRatio;
        imgY = (imgHeight - imgH) / 2;
    } else {
        // Se a proporção da tela for menor ou igual à da imagem, ajusta a largura da imagem
        imgW = imgHeight * cnvRatio;
        imgX = (imgWidth - imgW) / 2;
    }

    // Desenha a imagem ajustada na tela
    image(fundoImagem, imgX, imgY, imgW, imgH);
    
    // Atualiza e desenha a bola
    bola.update(); 
    bola.desenha(); 
    // Atualiza e desenha a raquete do jogador
    raquete1.update(); 
    raquete1.desenha(); 
    // Atualiza e desenha a raquete do computador
    computador.update(); 
    computador.desenha(); 
}