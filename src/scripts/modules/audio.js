import { getOption } from "../options.js";
import { generateRainbowColor } from "./rainbow.js";

const audioDOM = {
    canvas: document.querySelector("#audio-visualizer canvas"),
    ctx: document.querySelector("#audio-visualizer canvas").getContext("2d"),
    icon: document.getElementById("sound-icon"),
};

let isInit = false;
let initIntervalId = null;

export function initAudioVisualizer() {
    audioDOM.canvas.width = 70 * 8;
    audioDOM.canvas.height = 300;

    if (!isInit) {
        initIntervalId = setInterval(updateDefault, 10);
        isInit = true;
    }
}

function updateDefault() {
    const ctx = audioDOM.ctx;
    const canvasHeight = audioDOM.canvas.height;

    ctx.clearRect(0, 0, audioDOM.canvas.width, canvasHeight);

    for (let i = 0; i < 70; i++) {
        const x = i * 8;
        const color = getOption("rainbowMode")
            ? generateRainbowColor()
            : getOption("primaryColor");

        ctx.fillStyle = color;
        ctx.fillRect(x, canvasHeight - 4, 7, 4);
    }
}

export function updateAudioVisualizer(audioArray) {
    if (initIntervalId !== null) {
        clearInterval(initIntervalId);
        initIntervalId = null;
    }

    const hasSound = audioArray.slice(0, 70).some((value) => value > 0.05);
    const ctx = audioDOM.ctx;
    const canvasHeight = audioDOM.canvas.height;

    ctx.clearRect(0, 0, audioDOM.canvas.width, canvasHeight);

    for (let i = 0; i < Math.min(audioArray.length, 70); i++) {
        const height = Math.max(4, audioArray[i] * canvasHeight);

        ctx.fillStyle = getOption("rainbowMode")
            ? generateRainbowColor()
            : getOption("primaryColor");
        ctx.fillRect(i * 8, canvasHeight - height, 7, height);
    }

    audioDOM.icon.classList[hasSound ? "add" : "remove"]("active");
}
