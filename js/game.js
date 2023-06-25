// pega o grid para colocar elementos dinamicamente dentro dele
const grid = document.querySelector('.grid')

const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

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

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 24) {
        clearInterval(this.loop);
        setTimeout(() => {
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
        }, 500)

    }

}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        count = count + 1;
        console.log(count)
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

            if (count >= 3) {
                alert(`Ops, ${spanPlayer.innerHTML} perdeu! Seu tempo foi de: ${timer.innerHTML}`)

            }
        }, 500);


    }
};


const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;

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

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    setTimeout(() => {
        card.className = 'card';
    }, 5500);

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
        timer.innerHTML = currentTimer + 1;

    }, 1000);
};

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}


