import Redis from 'ioredis';
export declare class RedisService {
    private readonly redis;
    constructor();
    getClient(): Redis;
}
