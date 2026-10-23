// Mémorise le thème choisi lorsque le navigateur autorise le stockage.
const themeButton = document.getElementById("theme-toggle");
const preferenceAppareil = window.matchMedia("(prefers-color-scheme: dark)");
let themeEnregistre = null;

try {
    themeEnregistre = localStorage.getItem("adel-theme");
} catch {
    // Le changement de thème reste disponible sans stockage.
}

function appliquerTheme(modeSombre) {
    document.body.classList.toggle("dark-mode", modeSombre);
    if (themeButton) {
        themeButton.textContent = modeSombre ? "Mode clair" : "Mode sombre";
        themeButton.setAttribute("aria-pressed", String(modeSombre));
    }
}

appliquerTheme(themeEnregistre === "dark" ||
    (themeEnregistre !== "light" && preferenceAppareil.matches));

if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener("click", () => {
        const modeSombre = !document.body.classList.contains("dark-mode");
        appliquerTheme(modeSombre);
        themeEnregistre = modeSombre ? "dark" : "light";
        try {
            localStorage.setItem("adel-theme", themeEnregistre);
        } catch {
            // Le thème s’applique même si sa sauvegarde est bloquée.
        }
    });
}

preferenceAppareil.addEventListener("change", (event) => {
    if (themeEnregistre !== "dark" && themeEnregistre !== "light") {
        appliquerTheme(event.matches);
    }
});
