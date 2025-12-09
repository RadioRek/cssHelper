let lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
    wheelMultiplier: 0.3
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


let durations = {
    "#sobreMi": 1,
    "#experiencia": 1,
    "#portfolio": 2,
    "#contacto": 2
}

const lang = navigator.language || navigator.userLanguage;
if (lang.startsWith("en")) {
    document.documentElement.setAttribute("lang", "en");

} else {
    document.documentElement.setAttribute("lang", "es");

}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        const id = link.getAttribute('href')
        const target = document.querySelector(id)
        lenis.scrollTo(target, {
            duration: durations[id]
        })
    })
})

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
        el.classList.remove("animCandleFlicker");

        textoFace.textContent = "Click the candle!";
        textoFace.classList.remove("animTextoParpadear");

        face.classList.remove("animBordeParpadear");
        face.style.borderRadius = "0rem";

        if (face.classList.contains("front")) {
            face.style.transform = "translateZ(75px)";
        }

        if (face.classList.contains("back")) {
            face.style.transform = "rotateY(180deg) translateZ(75px)";
        }

        if (face.classList.contains("left")) {
            face.style.transform = "rotateY(-90deg) translateZ(75px)";
        }

        if (face.classList.contains("right")) {
            face.style.transform = "rotateY(90deg) translateZ(75px)";
        }

        if (face.classList.contains("top")) {
            face.style.transform = "rotateX(90deg) translateZ(75px)";
        }

        if (face.classList.contains("bottom")) {
            face.style.transform = "rotateX(-90deg) translateZ(75px)";
        }


    } else {

        el.classList.remove("candleSvgOff");
        el.classList.add("candleSvgOn");
        el.classList.add("animCandleFlicker");

        textoFace.textContent = "The candle is lit!";
        textoFace.classList.add("animTextoParpadear");

        face.classList.add("animBordeParpadear");
        face.style.borderRadius = "1rem";

        if (face.classList.contains("front")) {
            face.style.transform = "translateZ(90px)";
        }

        if (face.classList.contains("back")) {
            face.style.transform = "rotateY(180deg) translateZ(90px)";
        }

        if (face.classList.contains("left")) {
            face.style.transform = "rotateY(-90deg) translateZ(90px)";
        }

        if (face.classList.contains("right")) {
            face.style.transform = "rotateY(90deg) translateZ(90px)";
        }

        if (face.classList.contains("top")) {
            face.style.transform = "rotateX(90deg) translateZ(90px)";
        }

        if (face.classList.contains("bottom")) {
            face.style.transform = "rotateX(-90deg) translateZ(90px)";
        }
    }

}


animate();


let inputs = document.querySelectorAll('.inputCustom, .textAreaCustom');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.remove('animBordeTextoParpadear');
        input.classList.add('animBordeTextoParpadearNaranja');
    });

    input.addEventListener('blur', () => {
        input.classList.remove('animBordeTextoParpadearNaranja');
        input.classList.add('animBordeTextoParpadear');
    });

});