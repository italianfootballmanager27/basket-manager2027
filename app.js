import { openSetup } from "./screens.js";

const dialog = document.querySelector("#setupDialog");
const managerButton = document.querySelector('[data-action="manager"]');
const playerButton = document.querySelector('[data-action="player"]');

managerButton.addEventListener("click", () => openSetup("manager", dialog));
playerButton.addEventListener("click", () => openSetup("player", dialog));

document.querySelector("#settingsButton").addEventListener("click", () => {
  alert("Le impostazioni avanzate saranno disponibili nelle prossime versioni.");
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Service worker non registrato:", error);
    });
  });
}
