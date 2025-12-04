#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define DHTPIN 23
#define DHTTYPE DHT11

#define LED_R 19
#define LED_V 18
#define LED_A 21

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "HITRON-F400";
const char* password = "K4AZLLSDFGKX";

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Conectando...");
  }

  Serial.println("WiFi conectado!");

  pinMode(LED_R, OUTPUT);
  pinMode(LED_V, OUTPUT);
  pinMode(LED_A, OUTPUT);
}

void loop() {
  delay(2000);

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  if(t >= 35) {
    digitalWrite(LED_A, LOW);
    digitalWrite(LED_V, LOW);
    digitalWrite(LED_R, HIGH);
  } else if (t >= 20 && t < 35) {
    digitalWrite(LED_A, LOW);
    digitalWrite(LED_R, LOW);
    digitalWrite(LED_V, HIGH);
  } else if(t < 20) {
    digitalWrite(LED_V, LOW);
    digitalWrite(LED_R, LOW);
    digitalWrite(LED_A, HIGH);
  }

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print("%  Temperature: ");
  Serial.print(t);
  Serial.println("°C ");

  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin("http://192.168.0.12:3000/dht");
    http.addHeader("Content-Type", "application/json");

    String json = "{\"temperatura\": " + String(t) +
                  ", \"humedad\": " + String(h) + "}";

    int code = http.POST(json);
    Serial.print("Status: ");
    Serial.println(code);

    http.end();
  }
}