const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form')

// valida se o campo foi preenchido
const validateInput = ({ target }) => {
    // se o usuário inserir mais de 2 caracteres...
    if (target.value.length > 2) {
        // o atributo 'disabled' será removido permintindo que seja clicado
        button.removeAttribute('disabled')
        return;
    }
    // caso o usuário apague o que estava no campo, o atributo 'disabled' é recolocado
    button.setAttribute('disabled', '')
}

const handleSubmit = (event) => {
    // evita o comportamento padrão dos formulários, que é recarregar a página quando enviado
    event.preventDefault();

    // guarda no Local Storage a informação colocada pelo o usuário no formulário
    localStorage.setItem('player' , input.value);

    // redireciona para a página do game
    window.location = 'pages/game.html'
}

// faz a chamada da validação
input.addEventListener('input', validateInput);

// faz a chamada da função de login
form.addEventListener('submit', handleSubmit);