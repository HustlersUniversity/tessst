// Select the canvas element
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold stars
const stars = [];
const shootingStars = [];

// Create a star
function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
    };
}

// Create a shooting star
function createShootingStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 4 + 2,
        angle: Math.random() * Math.PI / 4 + Math.PI / 4,
        opacity: 1,
    };
}

// Populate the stars array
for (let i = 0; i < 100; i++) {
    stars.push(createStar());
}

// Draw a star
function drawStar(star) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Update star position
function updateStar(star) {
    star.y += star.speed;
    if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
    }
}

// Draw a shooting star
function drawShootingStar(star) {
    const endX = star.x + Math.cos(star.angle) * star.length;
    const endY = star.y + Math.sin(star.angle) * star.length;

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Update shooting star position
function updateShootingStar(star) {
    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;
    star.opacity -= 0.02;

    if (star.opacity <= 0) {
        const index = shootingStars.indexOf(star);
        shootingStars.splice(index, 1);
    }
}

// Animation loop
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw stars
    stars.forEach((star) => {
        drawStar(star);
        updateStar(star);
    });

    // Update and draw shooting stars
    shootingStars.forEach((star) => {
        drawShootingStar(star);
        updateShootingStar(star);
    });

    // Add a new shooting star randomly
    if (Math.random() < 0.01) {
        shootingStars.push(createShootingStar());
    }

    requestAnimationFrame(animateStars);
}

// Start the animation
animateStars();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});