#include "encoder.h"
#include "Lcdtft.h"
#include "i2s_play_memo.h"
#include <esp_task_wdt.h>

void task_lcdtft( void *pvParameters);
void task_firebase( void *pvParameters);
void task_todo_record( void *pvParameters);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  //encoder
  pinMode (pinA,INPUT);
  pinMode (pinB,INPUT);
  pinALast = digitalRead(pinA);

  // WiFi Connected
  connect_wifi();
  // firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  
  // lcd tft
  tft.begin();
  tft.setRotation(1);
  tft.init();
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_RED);
  tft.setTextSize(1);
  tft.setFreeFont(FF45); 

  // initialise the SD card. (connects to SPI)
  SPI.setFrequency(8000000);
  SDInit();

  //initialise the wave header for recording. 
  wavHeader(header, FLASH_RECORD_SIZE);
  clear_i2s_driver();

  //Semaphore
  semaphore = xSemaphoreCreateBinary();
  xSemaphoreGive(semaphore); 

  // Task
  xTaskCreatePinnedToCore(task_lcdtft, "task_lcdtft" , 1024*10 , NULL, 1, NULL, 0);
  xTaskCreatePinnedToCore(task_firebase, "task_firebase" , 1024*10 , NULL, 2, NULL, 0);

  xTaskCreatePinnedToCore(task_todo_record, "task_todo_record" , 1024*10 , NULL, 1, NULL, 1);
  
  Serial.print("Free heap: ");
  Serial.println(ESP.getFreeHeap());

}

void loop() {
  Encoder_volume();
}

void task_lcdtft ( void *pvParameters)
{
  esp_task_wdt_init(30, false);
  (void) pvParameters;
  while (1)
  {
    switch(current_screen){
      case 0: Wallpaper(); break;
      case 1: Menu(); break;
      case 2: Wifi(); break;
      case 3: Bluetooth(); break;
      case 4: Todo(); break;
      case 5: Record(); break;
      case 6: Music(); break;
      case 7: Todo(); break;
    } 
  }
}

void task_firebase ( void *pvParameters)
{
  esp_task_wdt_init(30, false);
  (void) pvParameters;
  while (1)
  {
    if(btn_todo == false && btn_record == false ){
      if (xSemaphoreTake(semaphore, 100) == pdTRUE){
        Serial.println("gianh quyen truy cap 1");
        Firebase.getInt(fbdo, "/Todo_List/play");
        delay(500);
        if(fbdo.intData() != 0){
          Firebase.getString(fbdo,"/Todo_List/time", tasktime);
          delay(500);
          Firebase.getString(fbdo,"/Todo_List/Desc", note);
          delay(500);
          Firebase.getString(fbdo, "/Todo_List/mode", mode);
          delay(500);
          current_screen = 7;
          btn_todo = true;    
        };
        xSemaphoreGive(semaphore);
      }      
    }
    vTaskDelay(500);
  }
}


void task_todo_record( void *pvParameters){
  (void) pvParameters;
  while (1){
    if(btn_record == true) i2s_record();
    else if(btn_todo == true) i2s_play();    
    vTaskDelay(500);
  }
}

