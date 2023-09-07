#ifndef ALL_DEF_H
#define ALL_DEF_H

#include <FirebaseESP32.h>
#include <WiFi.h>

#define WIFI_SSID "Thao"
#define WIFI_PASSWORD "11113333"

#define FIREBASE_HOST "https://doan2-5f89d-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "31vU5zYA43t4tJB5J8Lo42m9mFHhP0fZINAFG6OF"

const int headerSize = 44;
byte header[headerSize];

bool btn_record = false;
bool btn_todo = false;

char realtime[12];
char tasktime[6];
char note[200];
char mode[2];

unsigned int volume = 5;

int current_screen = 0;

String recordname;

FirebaseData fbdo;

SemaphoreHandle_t semaphore;

void connect_wifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(100);
}


#endif
