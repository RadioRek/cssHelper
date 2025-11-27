const lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
    wheelMultiplier: 0.4
});


function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);





const cube = document.querySelector('.cube');

let isDragging = false;
let startX = 0;
let startY = 0;
let currentRotX = -20;
let currentRotY = 20;
let targetRotX = currentRotX;
let targetRotY = currentRotY;

cube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

cube.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', e => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    targetRotY = currentRotY + dx * 0.25;
    targetRotX = currentRotX - dy * 0.25;
});

function animate() {
    currentRotX += (targetRotX - currentRotX) * 0.15;
    currentRotY += (targetRotY - currentRotY) * 0.15;

    cube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
    requestAnimationFrame(animate);
}


function encender(el) {
    let face = el.parentElement;
    let textoFace = face.querySelector('.head6');

    if (el.classList.contains("candleSvgOn")) {

        el.classList.remove("candleSvgOn");
        el.classList.add("candleSvgOff");
        face.classList.remove("parpadearBordeOrange");
        textoFace.classList.remove("parpadearTextoWhite");

    } else {
        el.classList.remove("candleSvgOff");
        el.classList.add("candleSvgOn");
        face.classList.add("parpadearBordeOrange");
        textoFace.classList.add("parpadearTextoWhite");
    }

}




animate();
