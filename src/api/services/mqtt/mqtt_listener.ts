import { client } from './mqtt_connector';

export class MQTTListener {
  async listenMessages() {
    client.on('message', (topic, message) => {
      console.log(`Recebendo mensagem em: [${topic}]`);
    });
  }
}
