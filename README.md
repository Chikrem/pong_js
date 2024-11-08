# Pong JS

Um jogo simples de Pong desenvolvido em JavaScript utilizando a biblioteca p5.js.

## Descrição

Este projeto implementa uma versão básica do jogo Pong. O jogo possui uma bola que se move pela tela e duas raquetes: uma controlada pelo jogador e outra controlada pelo computador.

## Funcionalidades

- Controle da raquete do jogador com o mouse.
- Raquete do computador que segue a bola.
- Colisões entre a bola e as raquetes.
- Colisões entre a bola e as bordas da tela.

## Como Executar

1. Clone o repositório para o seu ambiente local.
2. Abra o arquivo `index.html` em um navegador web.

## Dependências

- [p5.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js)
- [p5.sound.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js)

## Estrutura do Código

### `sketch.js`

- `Raquete`: Classe que representa a raquete do jogador.
- `Computador`: Classe que representa a raquete do computador.
- `Bola`: Classe que representa a bola do jogo.
- `preload()`: Função que carrega as imagens dos elementos do jogo.
- `setup()`: Função que inicializa o canvas e os objetos do jogo.
- `draw()`: Função que atualiza e desenha os elementos do jogo a cada frame.

### `index.html`

Arquivo HTML que configura o ambiente do p5.js e carrega o script `sketch.js`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou novas funcionalidades. Para isso, faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
