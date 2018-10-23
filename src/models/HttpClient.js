import axios from 'axios';

export default class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({ baseURL });
    this.errorHandlerId = null;
  }

  setHeader = (name, value) => {
    this.instance.defaults.headers.common[name] = value;
  };

  removeHeader = name => {
    delete this.instance.defaults.headers.common[name];
  };

  onError = handler => {
    this.errorHandlerId = this.instance.interceptors.response.use(
      response => response,
      handler,
    );
  };

  offError = () => {
    this.instance.interceptors.response.eject(this.errorHandlerId);
    this.errorHandlerId = null;
  };

  retry = config =>
    this.instance.request({
      ...config,
      baseURL: undefined,
    });

  get = async (url, config) => {
    const response = await this.instance.get(url, config);
    return response.data;
  };

  post = async (url, data) => {
    const response = await this.instance.post(url, data);
    return response.data;
  };

  put = async (url, data) => {
    const response = await this.instance.put(url, data);
    return response.data;
  };

  delete = async url => {
    const response = await this.instance.delete(url);
    return response.data;
  };
}
