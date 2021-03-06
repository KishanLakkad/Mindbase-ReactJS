// import createBrowserHistory from 'history/createBrowserHistory';
const createBrowserHistory = require("history").createBrowserHistory

const instance = createBrowserHistory();

export const navigateTo = path => instance.push(path);

export default instance;