import { initializeBackground } from "./modules/background.js";
import { initAudioVisualizer, updateAudioVisualizer } from "./modules/audio.js";
import { startTimeUpdate } from "./modules/time.js";
import { updateTrack } from "./modules/track.js";
import { setOption } from "./options.js";
import { nlz } from "./libs/utils.js";

initializeBackground();
startTimeUpdate();
initAudioVisualizer();

window.livelyPropertyListener = (name, value) => setOption(name, value);
window.livelyAudioListener = (audioArray) => updateAudioVisualizer(nlz(audioArray));
window.livelyCurrentTrack = (trackData) => updateTrack(trackData);