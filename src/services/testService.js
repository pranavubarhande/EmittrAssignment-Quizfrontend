import client from '../util/fetchUtil';
import { POST_METHOD, GET_METHOD, PUT_METHOD } from './service.constants';

const ALL_TESTS_URL = 'tests/getalltests';
const TESTSSUMMARY_URL = 'tests/getTestSummary';
const TESTSHISTORY_URL = 'tests/getTestHistory';
const TESTSLEADERBOARD_URL = 'tests/getTestLeaderBoard';
const SUBMIT_TESTS_URL = 'tests/submitUserTest';

export const getalltests = async () => {
    return await client(ALL_TESTS_URL, GET_METHOD);
};
export const getTestSummary = async (userId) => {
    return await client(`${TESTSSUMMARY_URL}?userId=${userId}`, GET_METHOD);
};
export const getTestHistory = async (userId) => {
    return await client(`${TESTSHISTORY_URL}?userId=${userId}`, GET_METHOD);
};
export const getTestLeaderBoard = async (subject) => {
    return await client(`${TESTSLEADERBOARD_URL}/${subject}`, GET_METHOD);
};
export const submitUserTest = async (body) => {
    return await client(SUBMIT_TESTS_URL, POST_METHOD, body);
};
