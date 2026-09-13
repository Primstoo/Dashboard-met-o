document.addEventListener("DOMContentLoaded", () => {

const input = document.getElementById("inpville");
const bouton = document.getElementById("botton");
const container = document.getElementById("d1");

// Remplacer par une clé OpenWeatherMap personnelle (gratuite) : https://openweathermap.org/api
// L'API étant appelée depuis le navigateur, la clé reste visible côté client : utiliser une
// clé dédiée à ce type de démo, jamais une clé partagée avec un autre projet.
const apiKey = "VOTRE_CLE_OPENWEATHERMAP";

bouton.addEventListener("click", () => {
    const ville = input.value.trim();
    if (ville === "") {
        afficherErreur("Écris une ville !");
        return;
    }
    fetchMeteo(ville);
    input.value = "";
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") bouton.click();
});

const fetchMeteo = async (ville) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200 || data.cod === "200") {
            creerCarte(data);
        } else {
            afficherErreur("Ville introuvable !");
        }
    } catch (error) {
        afficherErreur("Erreur réseau, vérifie ta connexion !");
    }
};

const afficherErreur = (message) => {
    const erreur = document.createElement("p");
    erreur.textContent = message;
    erreur.style.color = "red";
    erreur.style.fontWeight = "bold";
    erreur.style.position = "fixed";
    erreur.style.top = "170px";
    erreur.style.left = "44%";
    document.body.appendChild(erreur);
    setTimeout(() => erreur.remove(), 3000);
};


const creerCarte = (data) => {

    const nom = data.name;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icone = data.weather[0].icon;

    // Vérification doublon
    const cartes = container.querySelectorAll(".meteoCarte");

    for (let carte of cartes) {

        if (carte.dataset.ville.toLowerCase() === nom.toLowerCase()) {

            afficherErreur("Cette ville existe déjà !");
            return;
        }
    }

    const fragment = document.createDocumentFragment();

    const meteoCarte = document.createElement("div");
    meteoCarte.classList.add("meteoCarte");

    meteoCarte.dataset.ville = nom;

    meteoCarte.innerHTML = `
        <h3><i class="fa-solid fa-city"></i> ${nom}</h3>

        <p><i class="fa-solid fa-temperature-half"></i> ${temp}°C</p>

        <p><i class="fa-solid fa-cloud-sun"></i> ${description}</p>

        <img src="https://openweathermap.org/img/wn/${icone}@2x.png">

        <div class="boutons">

            <button onclick="supprimerCarte(this.closest('.meteoCarte'))">
                <i class="fa-solid fa-trash"></i> Supprimer
            </button>

            <button onclick="monterCarte(this.closest('.meteoCarte'))">
                <i class="fa-solid fa-arrow-up"></i>
            </button>

            <button onclick="descendreCarte(this.closest('.meteoCarte'))">
                <i class="fa-solid fa-arrow-down"></i>
            </button>

        </div>
    `;

    fragment.appendChild(meteoCarte);

    container.appendChild(fragment);

    sauvegarder();
};

const supprimerCarte = (meteoCarte) => {
    container.removeChild(meteoCarte);
    sauvegarder();
};


const monterCarte = (meteoCarte) => {
    const precedente = meteoCarte.previousElementSibling;
    if (precedente) {
        container.insertBefore(meteoCarte, precedente);
        sauvegarder();
    }
};


const descendreCarte = (meteoCarte) => {
    const suivante = meteoCarte.nextElementSibling;
    if (suivante) {
        container.insertBefore(suivante, meteoCarte);
        sauvegarder();
    }
};

const sauvegarder = () => {
    const meteoCartes = container.querySelectorAll(".meteoCarte");
    const villes = [];
    meteoCartes.forEach(meteoCarte => {
        if (meteoCarte.dataset.ville) {
            villes.push(meteoCarte.dataset.ville);
        }
    });
    sessionStorage.setItem("villes", JSON.stringify(villes));
};


const charger = () => {
    const villes = JSON.parse(sessionStorage.getItem("villes"));
    if (villes) {
        villes.forEach(ville => fetchMeteo(ville));
    }
};

window.supprimerCarte = supprimerCarte;
window.monterCarte = monterCarte;
window.descendreCarte = descendreCarte;

charger();

});