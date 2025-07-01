export function getFieldsID(fieldname){
    const fields = {
        name: "authorName",
        image: "authorImage",
        bio: "authorBio",
        country: "authorCountry",
        lang: "auhorLang"
    }

    return fields[fieldname];
}   

export function validation(field) {
    console.log(field)
    let errors = [];
    const regexName = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'´\-.\s]{2,20}$/;
    const regexImg = /\.(jpe?g|png|gif|bmp|webp)$/i;
    const regexDesc = /^.{0,300}$/;

    if (!field.authorName.trim()) {
        errors.name = "ingresa al menos un nombre";
    } else if (!regexName.text(field.authorname.trim())) {
        errors.name = "El nombre debe tener al menos 2 y un maximo de 20 caracteres";
    }

    if (!field.authorImage.trim()) {
        errors.image = "ingresa una url para tu imagen";
    } else if (!regexImg.text(field.authorname.trim())) {
        errors.image = "Ingresa una url valida de imagen (jpg, png, gif, webp";
    }

    if (!field.authorDesc.trim()) {
        errors.desc = "Es requerido";
    } else if (!regexDesc.text(field.authorname.trim())) {
        errors.desc = "La biografia debe tener entre 10 y 300 caracteres";
    }

    return errors;
}