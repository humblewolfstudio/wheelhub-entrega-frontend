import axios from 'axios';

export const calculateStrength = (password: string) => {
    var strength = 0;
    if (password.length > 8) {
        strength += 1;
    }
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        strength += 1;
    }
    if (password.match(/\d/)) {
        strength += 1;
    }
    if (password.match(/[^a-zA-Z\d]/)) {
        strength += 1;
    }

    return strength;
}

export const createUser = (username: string, password: string) => {
    return new Promise((Resolve, Reject) => {
        axios.post("http://localhost:8080/api/create", { username: username, password: password })
            .then((response) => {
                if (response.status == 200) {
                    Resolve(true);
                } else {
                    Resolve(false);
                }
            })
    })
}