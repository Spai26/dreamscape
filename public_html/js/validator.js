export function getFieldsID(fieldname) {
    const fields = {
        name: "authorName",
        img: "authorImage",
        bio: "authorBio",
        country: "authorCountry",
        lang: "auhorLang"
    }

    return fields[fieldname];
}

export function validation(field, singleField = null) {
    let errors = [];
    const regexName = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'´\-.\s]{2,20}$/;
    const regexImg = /\.(jpe?g|png|gif|bmp|webp)$/i;
    const regexDesc = /^.{0,300}$/;

    if (!singleField || field === "name") {
        if (!field.name.trim()) {
            errors.name = "ingresa al menos un nombre";
        } else if (!regexName.test(field.name.trim())) {
            errors.name = "El nombre debe tener al menos 2 a 20 caracteres";
        }
    }


    if (!singleField || field === "img") {
        if (!field.img.trim()) {
            errors.image = "ingresa una url para tu imagen";
        } else if (!regexImg.test(field.img.trim())) {
            errors.image = "Ingresa una url valida de imagen (jpg, png, gif, webp";
        }
    }

    if (!singleField || field === "bio") {
        if (!field.bio.trim()) {
            errors.desc = "Es requerido";
        } else if (!regexDesc.test(field.bio.trim())) {
            errors.desc = "La biografia debe tener entre 10 y 300 caracteres";
        }
    }

    return errors;
}