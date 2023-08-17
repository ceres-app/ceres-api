const PORT = parseInt(process.env.PORT || '3000');
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL;
const DATABASE_URL = process.env.DATABASE_URL;
const BROKER_URL = process.env.BROKER_URL;
export { BROKER_URL, DATABASE_URL, MQTT_BROKER_URL, PORT };
