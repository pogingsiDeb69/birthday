// ❤️ Falling hearts animation
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const hearts = [];
function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    opacity: Math.random(),
  };
}

for (let i = 0; i < 30; i++) {
  hearts.push(createHeart());
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(
      heart.x + heart.size / 2, heart.y - heart.size / 2,
      heart.x + heart.size * 1.5, heart.y + heart.size / 3,
      heart.x, heart.y + heart.size
    );
    ctx.bezierCurveTo(
      heart.x - heart.size * 1.5, heart.y + heart.size / 3,
      heart.x - heart.size / 2, heart.y - heart.size / 2,
      heart.x, heart.y
    );
    ctx.fillStyle = `rgba(255, 51, 102, ${heart.opacity})`;
    ctx.fill();
    heart.y += heart.speed;
    if (heart.y > canvas.height) {
      heart.x = Math.random() * canvas.width;
      heart.y = -10;
    }
  });
  requestAnimationFrame(drawHearts);
}

drawHearts();


const slideshow = document.getElementById("slideshow");
const dotsContainer = document.getElementById("dots");

// Dynamically add us4.jpg to us17.jpg
for (let i = 4; i <= 17; i++) {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("slide", "fade");

    const img = document.createElement("img");
    img.src = `img/us${i}.jpg`;
    img.alt = `Photo ${i}`;

    slideDiv.appendChild(img);
    slideshow.insertBefore(slideDiv, dotsContainer);
}

// Dynamically generate dots based on number of slides
const slides = document.getElementsByClassName("slide");
for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("onclick", `currentSlide(${i + 1})`);
    dotsContainer.appendChild(dot);
}

let slideIndex = 1;
showSlides(slideIndex);

// Manual navigation via dots
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Automatic slideshow
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    setTimeout(() => showSlides(slideIndex), 3000); // Change image every 3 seconds
}
