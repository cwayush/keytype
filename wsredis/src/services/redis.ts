import Redis from 'ioredis';

const URL = 'redis://localhost:6379';

const redis = new Redis(URL);

export class RedisManager {
  private publisher: Redis;
  public subscriber: Redis;

  constructor() {
    this.publisher = redis;
    this.subscriber = redis;
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
