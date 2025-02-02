import { getOption } from "../options.js";
import { hexToRgb, rgbToHsl } from "../libs/utils.js";

const backgroundDOM = {
    background: document.getElementById("background"),
    backgroundShadow: document.getElementById("background"),
    track: document.getElementById("track"),
}

export function initializeBackground() {
    const color = getOption("primaryColor");
    backgroundDOM.backgroundShadow.style.color = color;
    backgroundDOM.track.style.color = color;

    particlesJS("background", {
        particles: {
            number: { value: 15, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: {
                type: "circle",
                stroke: { width: 0 },
                polygon: { nb_sides: 5 },
            },
            opacity: { value: 0.7, random: false, anim: { enable: false } },
            size: { value: 3, random: true, anim: { enable: false } },
            line_linked: { enable: false },
            move: {
                enable: true,
                speed: 1,
                direction: "top",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true,
            },
            modes: { repulse: { distance: 200, duration: 0.4 } },
        },
        retina_detect: true,
    });
}

export function updateBackground(color) {
    backgroundDOM.backgroundShadow.style.color = color;
    backgroundDOM.track.style.color = color;

    if (pJSDom && pJSDom[0] && pJSDom[0].pJS) {
        const pJS = pJSDom[0].pJS;
        pJS.particles.array.forEach((particle) => {
            particle.color.rgb = hexToRgb(color);
            particle.color.hsl = rgbToHsl(particle.color.rgb);
        });
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, pJS.particles.shapeType, pJS.mouse, 0, 0, 0, 0);
        pJS.fn.vendors.drawParticles(pJS.particles.array);
    }
}