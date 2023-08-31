#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include "SSD1306Wire.h"

#define DHTPIN D3 // Pino de dados do sensor conectado ao D2 do ESP8266
#define DHTTYPE DHT11 // Define o tipo de sensor

DHT dht(DHTPIN, DHTTYPE);
SSD1306Wire  display(0x3c, D1, D2);

int azul = D7;//Atribui o valor 9 a variável azul
int verde = D8;//Atribui o valor 10 a variável verde
int vermelho = D5;//Atribui o valor 12 a variável vermelho
float tempweb = 0.0; // Variável para armazenar o valor retornado
float maxima = 100.0;
float minima = 0.0;

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin("Casa dos fundos da casa amarela", "lulalindo2022");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Conectado à rede Wi-Fi ");
  Serial.println(WiFi.SSID());
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
  Serial.begin(115200);
  display.init();
  display.flipScreenVertically();
  pinMode(azul, OUTPUT);//Define a variável azul como saída
  pinMode(verde, OUTPUT);//Define a variável verde como saída
  pinMode (vermelho, OUTPUT);//Define a variável vermelho como saída
}

void printOled(float temperatura, float umidade, float maxima, float minima) {
  display.clear();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.setFont(ArialMT_Plain_16);
  
  String tempString = String(temperatura, 1);
  String umidString = String(umidade, 1);
  String minString = String(minima, 1);
  String maxString = String(maxima, 1);

  String tempLabel = "Temp: " + tempString + " °C";
  String umidLabel = "Umidade: " + umidString + " %";
  String minMaxLabel = "Set: " + minString + "/" + maxString;

  display.drawStringMaxWidth(0, 0, 128, tempLabel);
  display.drawStringMaxWidth(0, 20, 128, umidLabel);
  display.drawStringMaxWidth(0, 40, 128, minMaxLabel);
  
  display.display();
  
}
void enviarDados(float temperatura, float umidade){
    // Requisição HTTP POST para enviar os dados ao servidor
  HTTPClient http;
  WiFiClient client;
  http.begin(client, "http://lulinucs.com.br:3000/receber-dados");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  String postData = "temperatura=" + String(temperatura) + "&umidade=" + String(umidade);
  int httpResponseCode = http.POST(postData);

  if (httpResponseCode == HTTP_CODE_OK) {
    Serial.println("Dados enviados com sucesso para o servidor!");
  } else {
    Serial.print("Falha ao enviar os dados para o servidor. Código de resposta: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void getTemp() {
  HTTPClient http;
  WiFiClient client;
  
  // Realiza a requisição GET
  http.begin(client, "http://lulinucs.com.br:3000/temperatura");
  int httpResponseCode = http.GET();

  if (httpResponseCode == HTTP_CODE_OK) {
    String response = http.getString();
    tempweb = response.toFloat(); // Converte o valor retornado para float
    Serial.print("Valor obtido: ");
    Serial.println(tempweb);
  } else {
    Serial.print("Falha na requisição. Código de resposta: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();

  delay(5000); // Aguarda 5 segundos antes de realizar a próxima requisição
}

void getMaxTemp() {
  HTTPClient http;
  WiFiClient client;
  
  // Realiza a requisição GET
  http.begin(client, "http://lulinucs.com.br:3000/maxtemp");
  int httpResponseCode = http.GET();

  if (httpResponseCode == HTTP_CODE_OK) {
    String response = http.getString();
    maxima = response.toFloat(); // Converte o valor retornado para float
    Serial.print("Valor obtido: ");
    Serial.println(tempweb);
  } else {
    Serial.print("Falha na requisição. Código de resposta: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();

  delay(5000); // Aguarda 5 segundos antes de realizar a próxima requisição
}


void getMinTemp() {
  HTTPClient http;
  WiFiClient client;
  
  // Realiza a requisição GET
  http.begin(client, "http://lulinucs.com.br:3000/mintemp");
  int httpResponseCode = http.GET();

  if (httpResponseCode == HTTP_CODE_OK) {
    String response = http.getString();
    minima = response.toFloat(); // Converte o valor retornado para float
    Serial.print("Valor obtido: ");
    Serial.println(minima);
  } else {
    Serial.print("Falha na requisição. Código de resposta: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();

  delay(5000); // Aguarda 5 segundos antes de realizar a próxima requisição
}


void loop() {
  delay(2000);

  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler o sensor DHT11!");
    return;
  }

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");

  Serial.print("Umidade: ");
  Serial.print(umidade);
  Serial.println(" %");

  enviarDados(temperatura, umidade);
  getTemp();
  getMaxTemp();
  getMinTemp();

  if(tempweb>maxima){
    digitalWrite(vermelho, HIGH);
    Serial.println("Tá quente");
  } else {
    digitalWrite(vermelho, LOW);
    Serial.println("Não tá quente");
  }

  if(tempweb<minima){
    digitalWrite(azul, HIGH);
    Serial.println("Tá frio");
  } else {
    digitalWrite(azul, LOW);
    Serial.println("Não tá frio");
  }

  printOled(temperatura, umidade, maxima, minima);
  
}
