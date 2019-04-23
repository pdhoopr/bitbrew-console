import axios from "axios";

const http = axios.create();

function proxy(request) {
  return async function getData(...args) {
    const response = await request(...args);
    return response.data;
  };
}

http.get = proxy(http.get);
http.post = proxy(http.post);
http.put = proxy(http.put);
http.delete = proxy(http.delete);

http.paginate = (url, params) =>
  http.get(url, {
    params: {
      pageSize: http.defaults.pageSize,
      ...params,
    },
  });

Object.freeze(http);

export default http;
