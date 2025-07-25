export function getFieldsID(fieldname) {
    const fields = {
        name: "authorName",
        email: "authorEmail",
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
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexImage = /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif|bmp)$/i;
    const regexDescription = /^.{10,300}$/s;

    if (!singleField || singleField === "name") {
        if (!values.name) {             
            errors.name = defaultMessage;
        } else if (!regexName.test(values.name)) {
            errors.name = "El nombre debe tener al menos 5 a 20 caracteres";
        }
    }
    
    if (!singleField || singleField === "email") {
        if (!values.email) {             
            errors.email = defaultMessage;
        } else if (!regexEmail.test(values.email)) {
            errors.email = "Ingresa un email valido";
        }
    }


    if (!singleField || singleField === "image") {
        if (!values.image) {
            errors.image = defaultMessage;
        } else if (!regexImage.test(values.image)) {
            errors.image = "Ingresa una url valida de imagen (jpg, png, gif, webp";
        }
    }
    const biovalue = values.bio || values.biografy
    if (!singleField || singleField === "biografy") {
        if (!biovalue) {
            errors.bio = defaultMessage;
            errors.biografy = defaultMessage;
        } else if (!regexDescription.test(biovalue)) {
            errors.bio = "La biografia debe tener entre 10 y 300 caracteres";
            errors.biografy = errors.bio
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
    return errors;
}