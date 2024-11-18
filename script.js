const canvas = document.getElementById('roulette-wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const themes = ["pailette", "bunny", "blonde", "guerriere", "gatsby", "coquette", "masque", "rouge"];
let rotationAngle = 0;
let themeAttribué = false; // Variable pour vérifier si un thème a été attribué

// Fonction pour dessiner la roue
function drawWheel(rotationAngle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer la roue précédente
    ctx.translate(canvas.width / 2, canvas.height / 2); // Déplacer le centre de la roue

    const segmentAngle = Math.PI * 2 / themes.length;

    // Dessiner chaque segment de la roue
    themes.forEach((theme, i) => {
        const startAngle = i * segmentAngle;
        const endAngle = (i + 1) * segmentAngle;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, canvas.width / 2, startAngle, endAngle);
        ctx.fillStyle = i % 2 === 0 ? '#f39c12' : '#e74c3c'; // Alternance des couleurs
        ctx.fill();

        ctx.save();
        ctx.rotate((startAngle + endAngle) / 2); // Centrer le texte
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(theme, canvas.width / 4, 10);
        ctx.restore();
    }

    ctx.rotate(rotationAngle); // Tourner la roue pour l'animation
    ctx.resetTransform(); // Réinitialiser la transformation
}

// Fonction pour faire tourner la roue
function spinWheel() {
    let rotateInterval = setInterval(() => {
        if (rotationAngle < Math.PI * 5) { // Limite de 5 tours avant de s'arrêter
            rotationAngle += 0.1; // Vitesse de la rotation
            drawWheel(rotationAngle); // Redessiner la roue
        } else {
            clearInterval(rotateInterval); // Arrêter la rotation
            displayTheme(rotationAngle); // Afficher le thème après la rotation
        }
    }, 30);
}

// Fonction pour afficher le thème
function displayTheme(rotationAngle) {
    const stopAngle = rotationAngle % (Math.PI * 2);
    const index = Math.floor((stopAngle / (Math.PI * 2)) * themes.length);
    const chosenTheme = themes[index];
    
    // Afficher le message avec le thème attribué
    document.getElementById('result').textContent = "Ton thème est : " + chosenTheme;
    document.getElementById('result').style.display = "block";
    themeAttribué = true; // Empêcher un autre tirage
}

// Event Listener pour le bouton "Start"
spinButton.addEventListener('click', () => {
    if (!themeAttribué) {
        themeAttribué = true; // Marquer que le thème a été attribué
        spinWheel(); // Démarrer la roue
    }
});

