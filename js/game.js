// pega o grid para colocar elementos dinamicamente dentro dele
const grid = document.querySelector('.grid')
// chama o elemento que contém a classe "player" para poder colocar informação dentro dele
const spanPlayer = document.querySelector('.player')
// chama o elemento que contém a classe "timer" para poder colocar informação dentro dele
const timer = document.querySelector('.timer')

// variável responsável pela contagem de erros
let count = 0;

const characters = [
    // array que representa todas as cartas que estão no jogo
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];


const createElement = (tag, className) => {
    // cria elemento e usa o método necessário, assim evita redundância no código
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

// verificador de fim de jogo
const checkEndGame = () => {
    // conta quantas cartas foram reveladas
    const disabledCards = document.querySelectorAll('.disabled-card');

    // caso todas as cartas sejam reveladas isso dá a vitória ao jogador
    if (disabledCards.length === 24) {
        clearInterval(this.loop);
        setTimeout(() => {
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
        }, 500)
    }
}

// verifica quais são as duas cartas viradas pelo player
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    // se as duas cartas viradas forem iguais, elas recebem o atributo que deixa ela desativada
    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        // chamada da função que verifica se é o fim da partida
        checkEndGame();
    } else {
        // caso as cartas selecionadas sejam diferentes, é contabilizado mais um erro e as cartas voltam ao estado antes de selecionas
        count = count + 1;
        console.log(count)
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

            // caso o número de erros chegue em 3, irá aparecer a mensagem de game over
            if (count >= 3) {
                alert(`Ops, ${spanPlayer.innerHTML} perdeu! Seu tempo foi de: ${timer.innerHTML}`)

            }
        }, 500);


    }
};
// função que revela a carta quando clicada
const revealCard = ({ target }) => {
// verifica se determinada classe está presente na carta
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    // se a varável estiver vazia, irá adicionar a classe necessária para a carta ser revelada
    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;
    
    // chamada da função que verifica quais foram as cartas clicadas pelo player
        checkCards();
    }
}

// Cria as cartas, adiciona os elementos e as classes necessárias
const createCard = (character) => {
    const card = createElement('div', 'card reveal-card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    // torna o "front" e o "back" elementos filho da "card"
    card.appendChild(front);
    card.appendChild(back);

    // quando uma carta é clicada, acontece a chamada da função que revela a carta
    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    setTimeout(() => {
        card.className = 'card';
    }, 5000);

    return card;
}

const loadGame = () => {
    // duplica o array que contém as cartas
    const duplicateCharacters = [...characters, ...characters];

    // embaralha as cartas
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    // percorre todo o array e cria as cartas no grid
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card)
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {

        const currentTimer = +timer.innerHTML; // '+' força a string se tornar um número
        // soma 1 a cada segundo que se passa
        timer.innerHTML = currentTimer + 1;

    }, 1000);
};

window.onload = () => {

    // atribui o valor guardado no local storage à spanPlayer
    spanPlayer.innerHTML = localStorage.getItem('player');
    // chamada das funções que iniciam a contagem de tempo e o embaralhamento de cartas
    startTimer();
    loadGame();
}


