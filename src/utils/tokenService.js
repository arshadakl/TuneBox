const TOKEN_KEY = 'token';
const NAME_KEY = "user"

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
};

export const getUsername = () => {
    return localStorage.getItem(NAME_KEY)
};

export const removeUsername = () => {
    localStorage.removeItem(NAME_KEY)
};
