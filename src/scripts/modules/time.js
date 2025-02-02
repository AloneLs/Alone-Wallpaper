export function updateTime() {
    const now = new Date();
    document.getElementById("time").textContent = `${fmt(now.getHours())}:${fmt(now.getMinutes())}`;
    document.getElementById("day").textContent = now.toLocaleDateString("ru-RU", { weekday: "long" });
    document.getElementById("date").textContent = now.toLocaleDateString("ru-RU");
}

export function startTimeUpdate() {
    setInterval(updateTime, 100);
}

function fmt(value) {
    return value.toString().padStart(2, "0");
}