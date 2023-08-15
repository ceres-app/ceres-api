import { IBrokerService } from '@/domain/ports/ibroker_service';
import { client } from './mqtt_connector';

export class MQTTBrokerService implements IBrokerService {
  async sendMessage<MessageData>(
    topic: string,
    message: MessageData,
  ): Promise<boolean> {
    try {
      await client.publishAsync(topic, JSON.stringify(message));
      return true;
    } catch (error: unknown) {
      return false;
    }
  }
}
