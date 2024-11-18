const themes = ["pailette", "bunny", "blonde", "guerriere", "gatsby", "coquette", "masque", "rouge"];
const spinButton = document.getElementById('spin-button');
const resultDiv = document.getElementById('result');
const themeResult = document.getElementById('theme-result');
const message = document.getElementById('message');
const canvas = document.getElementById('roulette-wheel');
const ctx = canvas.getContext('2d');

const wheelRadius = canvas.width / 2;
const segmentAngle = Math.PI * 2 / themes.length;
let chosenTheme = null; // Variable pour stocker le thème attribué

// Fonction pour dessiner la roue
function drawWheel(rotationAngle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(wheelRadius, wheelRadius); // Déplacer le centre de la roue

    // Dessiner chaque segment avec un angle et une couleur
    themes.forEach((theme, i) => {
        const startAngle = i * segmentAngle;
        const endAngle = (i + 1) * segmentAngle;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, wheelRadius, startAngle, endAngle);
        ctx.fillStyle = i % 2 === 0 ? '#f39c12' : '#e74c3c'; // Couleurs alternées
        ctx.fill();

        // Ajouter le texte du thème au centre de chaque segment
        ctx.save();
        ctx.rotate((startAngle + endAngle) / 2); // Centrer le texte
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(theme, wheelRadius / 2, 10);
        ctx.restore();
    }

    ctx.rotate(rotationAngle); // Tourner la roue pour l'animation
    ctx.resetTransform(); // Réinitialiser la transformation pour la prochaine itération
}

// Fonction pour faire tourner la roue
function spinWheel() {
    let rotationAngle = 0;
    const rotationSpeed = 0.05; // La vitesse de la rotation
    const maxRotation = Math.PI * 10; // Combien de tours la roue doit faire avant de s'arrêter

    function rotate() {
        if (rotationAngle < maxRotation) {
            rotationAngle += rotationSpeed;
            drawWheel(rotationAngle);
            requestAnimationFrame(rotate);
        } else {
            stopWheel(rotationAngle); // Quand la roue est arrêtée, on appelle la fonction pour choisir un thème
        }
    }

    rotate();
}

// Fonction pour arrêter la roue et choisir un thème
function stopWheel(rotationAngle) {
    const stopAngle = rotationAngle % (Math.PI * 2);
    const index = Math.floor((stopAngle / (Math.PI * 2)) * themes.length);
    chosenTheme = themes[index];

    // Afficher le résultat
    themeResult.textContent = chosenTheme;
    resultDiv.style.display = "block";
}

// Ajouter l'événement au bouton pour commencer la rotation
spinButton.addEventListener('click', () => {
    if (!chosenTheme) { // Si aucun thème n'a été attribué
        spinWheel();
    }
});
