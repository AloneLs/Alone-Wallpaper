import { startRainbowMode, stopRainbowMode } from "./modules/rainbow.js";
import { updateBackground } from "./modules/background.js";

const options = {
    primaryColor: "#360e94",
    rainbowMode: false,
};

export function setOption(name, value) {
    switch (name) {
        case "primaryColor":
            options.primaryColor = value;
            if (!options.rainbowMode) updateBackground(value);
            break;
        case "rainbowMode":
            options.rainbowMode = value;
            if (value) startRainbowMode();
            else {
                stopRainbowMode();
                updateBackground(options.primaryColor);
            }

            break;
        default:
            break;
    }
}

export function getOption(name) {
    return options[name];
}
