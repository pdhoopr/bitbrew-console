import axios from "axios";

const http = axios.create();

http.paginate = (url, params) =>
  http.get(url, {
    params: {
      pageSize: http.defaults.pageSize,
      ...params,
    },
  });

Object.freeze(http);

export default http;
