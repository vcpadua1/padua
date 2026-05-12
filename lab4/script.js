function verificarNumero() {

    // Número digitado pelo usuário
    let numeroUsuario =
        Number(document.getElementById("numeroUsuario").value);

    // Número aleatório entre 0 e 9
    let numeroAleatorio =
        Math.floor(Math.random() * 10);

    // Elemento do resultado
    let resultado =
        document.getElementById("resultado");

    // Estrutura condicional
    if (numeroUsuario == numeroAleatorio) {

        resultado.innerHTML =
            "Parabéns! Você acertou! O número era " +
            numeroAleatorio;

        resultado.style.setProperty(
            "background-color",
            "lightgreen"
        );

    } else if (numeroUsuario > numeroAleatorio) {

        resultado.innerHTML =
            "Você errou! Seu número é MAIOR que " +
            numeroAleatorio;

        resultado.style.setProperty(
            "background-color",
            "red"
        );

    } else {

        resultado.innerHTML =
            "Você errou! Seu número é MENOR que " +
            numeroAleatorio;

        resultado.style.setProperty(
            "background-color",
            "red"
        );
    }
}