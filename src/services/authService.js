import client from '../util/fetchUtil';
import { POST_METHOD, GET_METHOD, PUT_METHOD } from './service.constants';

const SIGN_UP_URL = 'auth/signup';
const SIGN_IN_URL = 'auth/signin';
const USER_URL = 'user/getuserbymail';

export const signUp = async (body) => {
    return await client(SIGN_UP_URL, POST_METHOD, body);
};

export const login = async (body) => {
    return await client(SIGN_IN_URL, POST_METHOD, body);
};

export const getUserInfo = async (body) => {
    return await client(USER_URL, POST_METHOD, body);
};
