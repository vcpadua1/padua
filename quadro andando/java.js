const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "fotodabola.png"; // troque pela sua imagem

let mouseX = 150;
let mouseY = 150;

const imgSize = 50;

// Movimento do mouse
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    limitarPosicao();
});

// Quando o mouse sai
canvas.addEventListener("mouseleave", () => {
    limitarPosicao();
});

function limitarPosicao() {
    const half = imgSize / 2;

    if (mouseX < half) mouseX = half;
    if (mouseY < half) mouseY = half;
    if (mouseX > canvas.width - half) mouseX = canvas.width - half;
    if (mouseY > canvas.height - half) mouseY = canvas.height - half;
}


function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        img,
        mouseX - imgSize / 2,
        mouseY - imgSize / 2,
        imgSize,
        imgSize
    );

    requestAnimationFrame(desenhar);
}

img.onload = () => {
    desenhar();
};