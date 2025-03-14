const $ = document.getElementById,
    options = { primaryColor: "#360e94", rainbowMode: !1 },
    audioDOM = {
        canvas: $("audio-visualizer").querySelector("canvas"),
        icon: $("sound-icon"),
    },
    trackDOM = {
        panel: $("track"),
        thumbnail: $("thumbnail"),
        thumbnailImg: $("thumbnail").querySelector("img"),
        title: $("title"),
        author: $("author"),
    },
    backgroundDOM = { background: $("background"), track: $("track") };
audioDOM.ctx = audioDOM.canvas.getContext("2d");

function setOption(n, e) {
    switch (n) {
        case "primaryColor":
            (options.primaryColor = e),
                options.rainbowMode || updateBackground(e);
            break;
        case "rainbowMode":
            (options.rainbowMode = e),
                e
                    ? startRainbowMode()
                    : (stopRainbowMode(),
                      updateBackground(options.primaryColor));
    }
}
function getOption(n) {
    return options[n];
}

let isInit = !1,
    initIntervalId = null,
    isRainbowActive = !1,
    rainbowInterval,
    previousTrackData = null;
function initAudioVisualizer() {
    (audioDOM.canvas.width = 560),
        (audioDOM.canvas.height = 300),
        isInit ||
            ((initIntervalId = setInterval(updateDefault, 10)), (isInit = !0));
}
function updateDefault() {
    audioDOM.ctx.clearRect(0, 0, 560, 300);
    for (let n = 0; n < 70; n++)
        (audioDOM.ctx.fillStyle = getOption("rainbowMode")
            ? generateRainbowColor()
            : getOption("primaryColor")),
            audioDOM.ctx.fillRect(8 * n, 296, 7, 4);
}
function updateAudioVisualizer(n) {
    initIntervalId && (clearInterval(initIntervalId), (initIntervalId = null));
    const e = n.slice(0, 70).some((n) => n > 0.05);
    audioDOM.ctx.clearRect(0, 0, 560, 300);
    for (let t = 0; t < 70; t++) {
        const o = Math.max(4, n[t] * 300);
        (audioDOM.ctx.fillStyle = getOption("rainbowMode")
            ? generateRainbowColor()
            : getOption("primaryColor")),
            audioDOM.ctx.fillRect(8 * t, 300 - o, 7, o);
    }
    audioDOM.icon.classList[e ? "add" : "remove"]("active");
}

function generateRainbowColor() {
    const n = 1e3 * Date.now(),
        e = Math.sin(n / 1e3) * 127 + 128,
        r = Math.sin(n / 1e3 + 2) * 127 + 128,
        g = Math.sin(n / 1e3 + 4) * 127 + 128;
    return `#${Math.round(e).toString(16).padStart(2, 0)}${Math.round(r)
        .toString(16)
        .padStart(2, 0)}${Math.round(g).toString(16).padStart(2, 0)}`;
}
function startRainbowMode() {
    (isRainbowActive = !0),
        (rainbowInterval = setInterval(() => {
            isRainbowActive && updateBackground(generateRainbowColor());
        }, 10));
}
function stopRainbowMode() {
    (isRainbowActive = !1), clearInterval(rainbowInterval);
}

function updateTime() {
    const n = new Date(),
        e = n.getHours(),
        t = n.getMinutes();
    ($("time").textContent = `${e.toString().padStart(2, 0)}:${t
        .toString()
        .padStart(2, 0)}`),
        ($("day").textContent = n.toLocaleDateString("ru-RU", {
            weekday: "long",
        })),
        ($("date").textContent = n.toLocaleDateString("ru-RU"));
}
setInterval(updateTime, 100);

function initializeBackground() {
    const n = getOption("primaryColor");
    (backgroundDOM.background.style.color = n),
        (backgroundDOM.track.style.color = n),
        particlesJS("background", {
            particles: {
                number: { value: 15, density: { enable: !0, value_area: 800 } },
                color: { value: n },
                shape: { type: "circle" },
                opacity: { value: 0.7 },
                size: { value: 3, random: !0 },
                move: { enable: !0, speed: 1, direction: "top" },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: !1 },
                    onclick: { enable: !1 },
                    resize: !0,
                },
            },
            retina_detect: !0,
        });
}
function updateBackground(n) {
    (backgroundDOM.background.style.color = n),
        (backgroundDOM.track.style.color = n),
        pJSDom &&
            pJSDom[0] &&
            pJSDom[0].pJS &&
            pJSDom[0].pJS.particles.array.forEach((e) => {
                e.color.rgb = hexToRgb(n);
            });
}

function updateTrack(n) {
    try {
        const e = JSON.parse(n);
        JSON.stringify(e) !== JSON.stringify(previousTrackData) &&
            ((previousTrackData = e), switchTrack(e));
    } catch (n) {}
}
function switchTrack(n) {
    trackDOM.panel.classList.remove("active"),
        setTimeout(() => {
            Object.keys(n).length ? displayTrack(n) : clearTrack();
        }, 500);
}
function clearTrack() {
    trackDOM.thumbnail.classList.add("skeleton"),
        trackDOM.title.classList.add("skeleton"),
        trackDOM.author.classList.add("skeleton"),
        (trackDOM.title.textContent = ""),
        (trackDOM.author.textContent = ""),
        (trackDOM.thumbnailImg.src = ""),
        trackDOM.thumbnailImg.classList.add("hidden");
}
function displayTrack(n) {
    n.Title &&
        ((trackDOM.title.textContent = n.Title),
        trackDOM.title.classList.remove("skeleton")),
        n.Artist &&
            ((trackDOM.author.textContent = n.Artist),
            trackDOM.author.classList.remove("skeleton")),
        n.Thumbnail &&
            (trackDOM.thumbnail.classList.remove("skeleton"),
            trackDOM.thumbnailImg.classList.remove("hidden"),
            (trackDOM.thumbnailImg.src = `data:image/png;base64,${n.Thumbnail}`)),
        setTimeout(() => trackDOM.panel.classList.add("active"), 500);
}

const hexToRgb = (n) => {
    n = n.replace("#", "");
    return {
        r: parseInt(n.substr(0, 2), 16),
        g: parseInt(n.substr(2, 2), 16),
        b: parseInt(n.substr(4, 2), 16),
    };
};
initializeBackground(), initAudioVisualizer(), updateTime();

window.livelyPropertyListener = (n, e) => setOption(n, e);
window.livelyAudioListener = (n) =>
    updateAudioVisualizer(n.map((n) => Math.min(1, Math.max(0, n))));
window.livelyCurrentTrack = updateTrack;
