// const BASE_URL = 'https://api.spanish.students.nomoredomains.monster';
const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`
// const BASE_URL = 'http://localhost:3000';
const getResponse = (res) => {
    if (res.ok) {
        return(res.json());
    } else {
        return res.json()
            .then((err) => {
                throw new Error(err.message);
            })
    }
};

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email }),
        credentials: 'include',
    })
        .then(getResponse)
};

export const login = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email }),
        credentials: 'include',
    })
        .then(getResponse)
};

export const logout = () => {
    return fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
        .then(getResponse)
};

export const cookiesCheck = () => {
    return fetch(`${BASE_URL}/check`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
      .then(getResponse)
};