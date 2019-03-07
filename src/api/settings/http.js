import axios from "axios";

const http = axios.create();

Object.freeze(http);

export default http;
