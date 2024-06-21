import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';
const NAME_KEY = "user"

export const getToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
};

export const getUsername = () => {
    return Cookies.get(NAME_KEY);
};

export const removeUsername = () => {
    Cookies.remove(NAME_KEY);
};
