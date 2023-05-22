function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/

    if(values.name === "") {
        error.name = "Ім'я не може бути порожнім"
    }
    else{
        error.name = ""
    }

    if(values.email === "") {
        error.email = "E-mail не може бути порожнім"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email не підходить"
    }
    else{
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Пароль не може бути порожнім"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Пароль не підходить"
    }
    else {
        error.password = ""
    }

    if(values.confirm_password === "") {
        error.confirm_password = "Пароль не може бути порожнім"
    }
    else if(!password_pattern.test(values.confirm_password) && !(values.confirm_password === values.password)) {
        error.confirm_password = "Пароль не підходить"
    }
    else {
        error.confirm_password = ""
    }
    return error;
}

export default Validation;