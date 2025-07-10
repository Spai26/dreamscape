export function getFieldsID(fieldname) {
    const fields = {
        name: "authorName",
        image: "authorImage",
        biografy: "authorBio",
        country: "authorCountry",
        language: "authorLanguages"
    }

    return fields[fieldname];
}

export function validation(values, singleField = null) {
    const defaultMessage = "Este campo es requerido";
    let errors = [];
    const regexName = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'´\-.\s]{5,20}$/;
    const regexImage = /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif|bmp)$/i;
    const regexDescription = /^.{10,300}$/s;

    if (!singleField || singleField === "name") {
        if (!values.name) {             
            errors.name = defaultMessage;
        } else if (!regexName.test(values.name)) {
            errors.name = "El nombre debe tener al menos 5 a 20 caracteres";
        }
    }


    if (!singleField || singleField === "image") {
        if (!values.image) {
            errors.image = defaultMessage;
        } else if (!regexImage.test(values.image)) {
            errors.image = "Ingresa una url valida de imagen (jpg, png, gif, webp";
        }
    }

    if (!singleField || singleField === "biografy") {
        if (!values.biografy) {
            errors.biografy = defaultMessage;
        } else if (!regexDescription.test(values.biografy)) {
            errors.biografy = "La biografia debe tener entre 10 y 300 caracteres";
        }
    }

    if (!singleField || singleField === "country") {
        if (!values.country) {
            errors.country = defaultMessage;
        } 
    }
    
    if (!singleField || singleField === "language") {
        if (!values.language) {
            errors.language = defaultMessage;
        } 
    }
    console.log(errors)
    return errors;
}