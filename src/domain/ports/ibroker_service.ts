export interface IBrokerService {
  sendMessage<MessageData>(
    topic: string,
    message: MessageData,
  ): Promise<boolean>;
}
