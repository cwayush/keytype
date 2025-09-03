import Redis from 'ioredis';

const URL = process.env.REDIS_URL || 'redis://localhost:6379';

export class RedisManager {
  private publisher: Redis;
  public subscriber: Redis;

  constructor() {
    this.publisher = new Redis(URL);
    this.subscriber = new Redis(URL);
  }

  async subscribe(channel: string) {
    try {
      await this.subscriber.subscribe(channel);
    } catch (err) {
      console.log(`Error subscribing to channel ${channel}:`, err);
    }
  }

  async unsubscribe(channel: string) {
    try {
      await this.subscriber.unsubscribe(channel);
    } catch (err) {
      console.log(`Error unsubscribing to channel ${channel}:`, err);
    }
  }

  publish(channel: string, message: any) {
    try {
      this.publisher.publish(channel, JSON.stringify(message));
    } catch (err) {
      console.log(`Error publishing to channel ${channel}:`, err);
    }
  }

  cleanup() {
    this.publisher.disconnect();
    this.subscriber.disconnect();
  }
}
