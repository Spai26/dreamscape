export const authors = [];

const languages = [
    { language: "Español", value: "es" },
    { language: "Ingles", value: "en" },
    { language: "Frances", value: "fr" },
    { language: "Japones", value: "jp" },
    { language: "Aleman", value: "de" }
]

const countries = [
    { cod: "PE", value: "Perú" },
    { cod: "AR", value: "Argentina" },
    { cod: "MX", value: "México" },
    { cod: "CO", value: "Colombia" },
    { cod: "CL", value: "Chile" },
    { cod: "ES", value: "España" },
    { cod: "US", value: "Estados Unidos" },
    { cod: "BR", value: "Brasil" },
    { cod: "EC", value: "Ecuador" },
    { cod: "BO", value: "Bolivia" },
    { cod: "UY", value: "Uruguay" },
    { cod: "PY", value: "Paraguay" },
    { cod: "CR", value: "Costa Rica" },
    { cod: "PA", value: "Panamá" },
    { cod: "VE", value: "Venezuela" }
]

export const loadCountriesOption = () => {
    const countrySelect = document.getElementById("authorCountry");
    countrySelect.innerHTML = `<option value="">Elegi tu país...</option>`;

    countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.value;
        option.textContent = country.value;
        countrySelect.appendChild(option);
    })
}

export const loadlanguageOption = () => {
    const languageSelect = document.getElementById("authorLanguages");

    languageSelect.innerHTML = `<option value="">Elegi tu lenguaje...</option>`;

    languages.forEach((lang) => {
        const option = document.createElement("option");
        option.value = lang.value
        option.textContent = lang.language
        languageSelect.appendChild(option);
    })
}