if (!window.localStorage) {
  class LocalStorageMock {
    items = new Map();

    getItem = jest.fn((key) => this.items.get(key) || null);

    setItem = jest.fn((key, value) => {
      this.items.set(key, String(value));
    });

    removeItem = jest.fn((key) => {
      this.items.delete(key);
    });

    clear = jest.fn(() => {
      this.items.clear();
    });
  }

  window.localStorage = new LocalStorageMock();
}
