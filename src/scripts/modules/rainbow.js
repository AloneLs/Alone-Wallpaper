import { updateBackground } from "./background.js";

let isRainbowActive = false;
let rainbowInterval;

export function generateRainbowColor() {
    const time = Date.now() * 0.001;
    const r = Math.sin(time) * 127 + 128;
    const g = Math.sin(time + 2) * 127 + 128;
    const b = Math.sin(time + 4) * 127 + 128;
    return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g)
        .toString(16)
        .padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
}

export function startRainbowMode() {
    isRainbowActive = true;
    rainbowInterval = setInterval(() => {
        if (isRainbowActive) {
            const color = generateRainbowColor();
            updateBackground(color);
        }
    }, 10);
}

export function stopRainbowMode() {
    isRainbowActive = false;
    clearInterval(rainbowInterval);
}