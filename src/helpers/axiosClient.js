import axios from "axios";

const URL = process.env.REACT_APP_API_URL
const VERSION = process.env.REACT_APP_API_VERSION

const client = axios.create({
    baseURL: `${URL}/${VERSION}`,
});

export {
    client
}