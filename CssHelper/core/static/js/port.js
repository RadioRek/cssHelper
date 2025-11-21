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
