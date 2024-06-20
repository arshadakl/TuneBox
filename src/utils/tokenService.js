import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const getToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
};
