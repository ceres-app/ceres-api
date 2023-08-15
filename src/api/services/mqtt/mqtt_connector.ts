import { connectAsync, MqttClient } from 'mqtt';
import { MQTTListener } from './mqtt_listener';

export let client: MqttClient;

export class MQTTConnector {
  constructor(private readonly listener: MQTTListener) {}

  private async connectMQTT(brokerURL: string) {
    try {
      client = await connectAsync(brokerURL);
      console.log(`Conexão com servidor MQTT realizada com sucesso.`);
    } catch (error: unknown) {
      throw new Error(
        `Não foi possível conectar ao servidor MQTT em '${brokerURL}'.`,
      );
    }
  }

  private async subscribeTopics() {
    await client.subscribeAsync('/water/send/command');
    await client.subscribeAsync('/water/get/status');
  }

  async init(brokerURL: string) {
    await this.connectMQTT(brokerURL);
    await this.subscribeTopics();
    await this.listener.listenMessages();
  }

  async close() {
    await client?.endAsync();
  }
}
