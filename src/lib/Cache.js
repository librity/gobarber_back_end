import Redis from 'ioredis';
import redisConfig from '../config/redis';

class Cache {
  constructor() {
    this.redis = new Redis({ ...redisConfig, keyPrefix: 'cache:' });
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cache = await this.redis.get(key);

    return cache ? JSON.parse(cache) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }
}

export default new Cache();