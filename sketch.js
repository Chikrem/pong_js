// Gera cores RGB aleatórias
color1 = Math.floor(Math.random() * 256);
color2 = Math.floor(Math.random() * 256);
color3 = Math.floor(Math.random() * 256);

// Classe RAQUETE
class Raquete {
    constructor(x) {
        this.w = 10; // Largura da raquete
        this.h = 100; // Altura da raquete
        this.x = 10 + this.w; // Posição inicial no eixo x
        this.y = height / 2; // Posição inicial no eixo y
    }

    update() {
        this.y = mouseY; // Define a posição da raquete como a posição do mouse
        this.y = constrain(this.y, this.h / 2, height - this.h / 2); // Limita a posição da raquete à tela
    }

    desenha() {
        fill(255); // Define a cor da raquete
        rectMode(CENTER); // Define o modo de desenho do retângulo
        rect(this.x, this.y, this.w, this.h); // Desenha a raquete
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
        fill(255); // Define a cor da raquete
        rectMode(CENTER); // Define o modo de desenho do retângulo
        rect(this.x, this.y, this.w, this.h); // Desenha a raquete
    }
}

// Classe BOLA
class Bola {
    constructor() {
        this.r = 25; // Raio da bola
        this.reset(); // Inicializa a posição e velocidade da bola
    }

    reset() {
        this.x = width / 2; // Posição inicial no centro da tela (eixo x)
        this.y = height / 2; // Posição inicial no centro da tela (eixo y)
        this.vx = Math.random() * 10 -3; // Velocidade aleatória no eixo x
        this.vy = Math.random() * 10 -3; // Velocidade aleatória no eixo y
    }

    update() {
        this.x += this.vx; // Atualiza a posição no eixo x
        this.y += this.vy; // Atualiza a posição no eixo y
        if (this.x < this.r || this.x > width - this.r) { // Verifica colisão com as bordas laterais
            this.reset(); // Reseta a posição e velocidade da bola
        }
        if (this.y < this.r || this.y > height - this.r) { // Verifica colisão com as bordas superior e inferior
            this.vy *= -1; // Inverte a direção no eixo y
        }

        // Verifica colisão com o objeto do tipo RAQUETE
        if (this.x - this.r < raquete1.x + raquete1.w / 2 
            && this.x + this.r > raquete1.x - raquete1.w / 2 
            && this.y - this.r < raquete1.y + raquete1.h / 2 
            && this.y + this.r > raquete1.y - raquete1.h / 2) {
            this.vx *= -1.1; // Inverte a direção no eixo x
        }

        // Verifica colisão com o objeto do tipo COMPUTADOR
        if (this.x - this.r < computador.x + computador.w / 2 
            && this.x + this.r > computador.x - computador.w / 2 
            && this.y - this.r < computador.y + computador.h / 2 
            && this.y + this.r > computador.y - computador.h / 2) {
            this.vx *= -1.1; // Inverte a direção no eixo x
        }
    }

    desenha(color1, color2, color3) {   
        fill(color1, color2, color3); // Define a cor da bola
        ellipse(this.x, this.y, this.r * 2, this.r * 2); // Desenha a bola
    }
}

let bola;
let raquete1;
let computador;

function setup() {
    createCanvas(800, 400); // Cria o canvas com largura 800 e altura 400
    bola = new Bola(); // Cria uma nova instância da classe Bola
    raquete1 = new Raquete(20); // Cria uma nova instância da classe Raquete
    computador = new Computador(width - 20); // Cria uma nova instância da classe Computador
}

function draw() {
    background(color(0)); // Define a cor de fundo
    bola.update(); // Atualiza a posição da bola
    bola.desenha(color1, color2, color3); // Desenha a bola com as cores aleatórias
    raquete1.update(); // Atualiza a posição da raquete
    raquete1.desenha(); // Desenha a raquete
    computador.update(); // Atualiza a posição da raquete do computador
    computador.desenha(); // Desenha a raquete do computador
}