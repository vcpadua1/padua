const canvas = document.getElementById("tela");
const ctx = canvas.getContext("2d");

// Céu
ctx.fillStyle = "#87CEEB";
ctx.fillRect(0, 0, 400, 300);

// Sol
ctx.beginPath();
ctx.arc(320, 60, 30, 0, Math.PI * 2);
ctx.fillStyle = "yellow";
ctx.fill();

// Chão
ctx.fillStyle = "#ccc";
ctx.fillRect(0, 200, 400, 100);

// Rio
ctx.beginPath();
ctx.moveTo(0, 200);
ctx.quadraticCurveTo(80, 150, 150, 200);
ctx.lineTo(0, 300);
ctx.closePath();
ctx.fillStyle = "blue";
ctx.fill();

// Casa (base)
ctx.fillStyle = "#8B4513";
ctx.fillRect(160, 140, 80, 60);

// Telhado
ctx.beginPath();
ctx.moveTo(150, 140);
ctx.lineTo(250, 100);
ctx.lineTo(200, 140);
ctx.closePath();
ctx.fillStyle = "#A52A2A";
ctx.fill();

// Porta
ctx.fillStyle = "#5C4033";
ctx.fillRect(190, 160, 20, 40);

// Janelas
ctx.fillStyle = "#00BFFF";
ctx.fillRect(165, 150, 20, 15);
ctx.fillRect(215, 150, 20, 15);

// Árvore esquerda
ctx.fillStyle = "#8B4513";
ctx.fillRect(80, 170, 10, 30);

ctx.beginPath();
ctx.arc(85, 160, 20, 0, Math.PI * 2);
ctx.fillStyle = "green";
ctx.fill();

// Árvore direita
ctx.fillStyle = "#8B4513";
ctx.fillRect(300, 170, 10, 30);

ctx.beginPath();
ctx.arc(305, 160, 20, 0, Math.PI * 2);
ctx.fillStyle = "green";
ctx.fill();