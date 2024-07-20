interface Cache {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
}

export class InMemoryCache implements Cache {
  private cache: Map<string, string>;

  constructor() {
    this.cache = new Map<string, string>();
  }

  async get(key: string): Promise<string | null> {
    return this.cache.get(key) || null;
  }

  async set(key: string, value: string): Promise<void> {
    this.cache.set(key, value);
  }
}

export const cache = new InMemoryCache();
