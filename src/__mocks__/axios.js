function getDefaults({ baseURL = '', headers = {} } = {}) {
  return {
    baseURL,
    headers: {
      common: headers,
    },
  };
}

function mockHttpMethod() {
  return jest.fn().mockResolvedValue({
    data: {},
  });
}

class AxiosMock {
  defaults = getDefaults();
  get = mockHttpMethod();
  post = mockHttpMethod();
  put = mockHttpMethod();
  delete = mockHttpMethod();
}

class ApiMock {
  api = new AxiosMock();

  create = jest.fn((config) => {
    this.api.defaults = getDefaults(config);
    return this.api;
  });

  reset = () => {
    this.api = new AxiosMock();
  };
}

export default new ApiMock();
