const trackDOM = {
    panel: document.getElementById("track"),
    thumbnail: document.getElementById("thumbnail"),
    thumbnailImg: document.querySelector("#thumbnail img"),
    title: document.getElementById("title"),
    author: document.getElementById("author"),
};

let previousTrackData = null;

export function updateTrack(data) {
    try {
        const currentTrackData = parseData(data);
        if (!isSame(currentTrackData, previousTrackData)) {
            if (previousTrackData && Object.keys(previousTrackData).length > 0) {
                switchTrack(currentTrackData);
            } else {
                loadTrack(currentTrackData);
            }
            previousTrackData = currentTrackData;
        }
    } catch (error) {
        console.error("Ошибка при обработке данных о треке:", error);
    }
}

function parseData(data) {
    return JSON.parse(data) || {};
}

function isSame(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function switchTrack(track) {
    hidePanel();
    setTimeout(() => {
        if (Object.keys(track).length > 0) {
            displayTrack(track);
        } else {
            clearTrack();
        }
    }, 500);
}

function loadTrack(track) {
    if (Object.keys(track).length > 0) {
        displayTrack(track);
    } else {
        clearTrack();
    }
}

function hidePanel() {
    trackDOM.panel.classList.remove("active");
}

function showPanel() {
    trackDOM.panel.classList.add("active");
}

function clearTrack() {
    trackDOM.thumbnail.classList.add("skeleton");
    trackDOM.title.classList.add("skeleton");
    trackDOM.author.classList.add("skeleton");
    trackDOM.title.textContent = "";
    trackDOM.author.textContent = "";
    trackDOM.thumbnailImg.src = "";
    trackDOM.thumbnailImg.classList.add("hidden");
}

function displayTrack(track) {
    if (track.Title) {
        trackDOM.title.textContent = track.Title || "-";
        trackDOM.title.classList.remove("skeleton");
    }
    if (track.Artist) {
        trackDOM.author.textContent = track.Artist || "-";
        trackDOM.author.classList.remove("skeleton");
    }
    if (track.Thumbnail) {
        trackDOM.thumbnail.classList.remove("skeleton");
        trackDOM.thumbnailImg.classList.remove("hidden");
        trackDOM.thumbnailImg.src = `data:image/png;base64,${track.Thumbnail}`;
    }
    setTimeout(showPanel, 500);
}