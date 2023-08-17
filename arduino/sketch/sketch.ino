#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>


// Update these with values suitable for your network.

const char* ssid = "Jonas-2.4G";
const char* password = "Amazonas23#jasl";
const char* mqtt_server = "192.168.80.102";

const char* SERIAL_NUMBER = "1234";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(80)
char msg[MSG_BUFFER_SIZE];
bool is_working = false;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {

  String topicAsString = String(topic);
  String payloadAsString = String((char *)payload);

  DynamicJsonDocument doc(1024);
  deserializeJson(doc, payloadAsString);

  const char* id = doc["id"];
  const char* command = doc["command"];

  String commandAsString = String(command);

  if(commandAsString == "turnon"){
    digitalWrite(D4, HIGH);
    is_working = true;
  }else{
    digitalWrite(D4, LOW);
    is_working = false;
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe("/water/send/command");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(D4, OUTPUT);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    String working = is_working ? "on" : "off";
    // String message = "'{\"status\":\""+working+"\",\"id\":\""+SERIAL_NUMBER+"\"}'";
    DynamicJsonDocument doc(1024);

    doc["sensor"] = working;
    doc["id"] = SERIAL_NUMBER;
    
    serializeJson(doc, msg);
    client.publish("/water/get/status", msg);
  }
}
