const content = document.querySelector("#dialogContent");
const title = document.querySelector("#dialogTitle");
const description = document.querySelector("#dialogDescription");
const kicker = document.querySelector("#dialogKicker");
const continueButton = document.querySelector("#continueButton");

export function openSetup(mode, dialog) {
  content.innerHTML = "";
  if (mode === "manager") {
    kicker.textContent = "NUOVA CARRIERA MANAGER";
    title.textContent = "Come vuoi iniziare?";
    description.textContent = "Scegli il tuo percorso. In seguito potrai selezionare campionato, squadra e impostazioni della carriera.";
    content.append(
      field("Tipo di carriera", "careerType", [
        ["existing", "Gestisci una squadra esistente"],
        ["create", "Crea una nuova società da zero"]
      ]),
      field("Ruolo", "managerRole", [
        ["coachgm", "Allenatore + General Manager"]
      ]),
      field("Squadre disponibili", "teamScope", [
        ["all", "Tutti i campionati e tutte le squadre"]
      ])
    );
    continueButton.onclick = (event) => {
      event.preventDefault();
      const values = readValues();
      localStorage.setItem("bm2027_manager_setup", JSON.stringify(values));
      showConfirmation("Manager Career", "Impostazioni iniziali salvate. Nella prossima versione aggiungeremo la selezione completa dei campionati e delle squadre.");
    };
  } else {
    kicker.textContent = "NUOVA CARRIERA GIOCATORE";
    title.textContent = "Il tuo percorso inizia qui";
    description.textContent = "Partirai dall'Under 17. Durante le partite controllerai soltanto il tuo cestista e crescerai con allenamenti, prestazioni e scelte personali.";
    content.append(
      field("Età di partenza", "startingCategory", [["u17","Under 17 · 16–17 anni"]]),
      field("Controllo in partita", "matchControl", [["player","Solo il mio cestista"]]),
      field("Sistema di crescita", "growth", [["all","Allenamenti, partite e scelte personali"]])
    );
    continueButton.onclick = (event) => {
      event.preventDefault();
      const values = readValues();
      localStorage.setItem("bm2027_player_setup", JSON.stringify(values));
      showConfirmation("Player Career", "Preferenze salvate. Nella prossima versione potrai creare il tuo giocatore e scegliere ruolo, altezza, caratteristiche e squadra giovanile.");
    };
  }
  dialog.showModal();
}

function field(label, name, options) {
  const wrapper = document.createElement("div");
  const caption = document.createElement("label");
  caption.className = "field-label";
  caption.textContent = label;
  caption.htmlFor = name;
  const select = document.createElement("select");
  select.className = "select-field";
  select.id = name;
  select.name = name;
  options.forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.append(option);
  });
  wrapper.append(caption, select);
  return wrapper;
}

function readValues() {
  return Object.fromEntries([...content.querySelectorAll("select")].map((el) => [el.name, el.value]));
}

function showConfirmation(name, message) {
  kicker.textContent = "CONFIGURAZIONE SALVATA";
  title.textContent = name;
  description.textContent = message;
  content.innerHTML = '<div class="info-note">Questa è la prima base funzionante del progetto. I dati vengono salvati sul dispositivo che stai utilizzando.</div>';
  continueButton.textContent = "FATTO";
  continueButton.onclick = (event) => {
    event.preventDefault();
    continueButton.textContent = "CONTINUA";
    document.querySelector("#setupDialog").close();
  };
}
