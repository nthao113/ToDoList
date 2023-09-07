// Touch handling for XPT2046 based screens is handled by
// the TFT_eSPI library.
#ifndef LCDTFT_H
#define LCDTFT_H

#include <TFT_eSPI.h> // Hardware-specific library
#include "Free_Fonts.h"

#include "global_vars.h"
#include "background.h"

TFT_eSPI tft = TFT_eSPI(); 
uint16_t x = 0, y = 0; // To store the touch coordinates
bool pressed;

// The hardware SPI can be mapped to any pins
// #define TFT_MISO 19   //t-do
// #define TFT_MOSI 23   //t-din
// #define TFT_SCLK 18   //t-clk
// #define TFT_CS   15  
// #define TFT_DC    2  
// #define TFT_RST   4  
// #define TOUCH_CS 21


// Invoke custom library

#define CALIBRATION_FILE "/TouchCalData3"
#define REPEAT_CAL true
#define BLACK_SPOT

void Wallpaper(){
  tft.pushImage(0, 0, 320, 240, wallpaper);
  delay(500);

  while(current_screen == 0){ 
    vTaskDelay(50);    
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 0 && x < 320 && (240 - y) > 0 && (240 - y) < 240) {
      current_screen = 1;
    }
  }
}

void Menu()
{
  tft.pushImage(0, 0, 320, 240, background_menu);
  delay(500);

  while(current_screen == 1){  
    vTaskDelay(50);    
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 34 && x < 96 && (240 - y) > 62 && (240 - y) < 126) {
      current_screen = 2;
    }
    else if (pressed && x > 125 && x < 189 && (240 - y) > 62 && (240 - y) < 126) {
      current_screen = 3;
    }
    else if (pressed && x > 219 && x < 282 && (240 - y) > 62 && (240 - y) < 126) {
      current_screen = 0;
    }
    else if (pressed && x > 34 && x < 96 && (240 - y) > 156 && (240 - y) < 212) {
      current_screen = 4;
    }
    else if (pressed && x > 125 && x < 189 && (240 - y) > 156 && (240 - y) < 212) {
      current_screen = 5;
    }
    else if (pressed && x > 219 && x < 282 && (240 - y) > 156 && (240 - y) < 212) {
      current_screen = 6;
    }
  }
}
void Wifi(){
  tft.pushImage(0, 0, 320, 240, background_wifi);
  delay(500);

  tft.setCursor(85, 115);
  tft.print(WIFI_SSID);

  tft.setCursor(85, 150);
  tft.print(11113333); 

  while(current_screen == 2){ 
    vTaskDelay(50);    
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 0 && x < 43 && (240 - y) > 0 && (240 - y) < 43) {
      current_screen = 1;
    }
  }
}

void Bluetooth(){
  tft.pushImage(0, 0, 320, 240, background_bluetooth);
  delay(500);

  while(current_screen == 3){ 
    vTaskDelay(50);    
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 0 && x < 43 && (240 - y) > 0 && (240 - y) < 43) {
      current_screen = 1;
    }
  }
}

void Todo(){
  tft.pushImage(0, 0, 320, 240, background_todo);

  if (xSemaphoreTake(semaphore, 1000) == pdTRUE) {
    Serial.println("gianh quyen truy cap 2");
    tft.setCursor(85, 95);
    tft.print(tasktime);

    tft.setCursor(85, 130);
    tft.print(note);
    xSemaphoreGive(semaphore);
  }
  
  while(current_screen == 7){
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 130 && x < 179 && (240 - y) > 185 && (240 - y) < 234) {   
      if (xSemaphoreTake(semaphore, 1000) == pdTRUE) {
        Serial.println("gianh quyen truy cap 2");
        btn_todo = false;
        current_screen = 4;
        while(Firebase.setDouble(fbdo, "/Todo_List/play", 0) == false){
          delay(1000);
        }
        xSemaphoreGive(semaphore);
      }
    }
  }

  while(current_screen == 4){ 
    vTaskDelay(50);
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 0 && x < 43 && (240 - y) > 0 && (240 - y) < 43) {
      current_screen = 1;
    }
  }  
}

void Record(){
  tft.pushImage(0, 0, 320, 240, background_record);

  delay(500);

  while(current_screen == 5){ 
    vTaskDelay(50);
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 0 && x < 43 && (240 - y) > 0 && (240 - y) < 43) {
      current_screen = 1;
    }
    else if (pressed && x > 53 && x < 115 && (240 - y) > 90 && (240 - y) < 150) {
      btn_record = true;
      current_screen = 8; 
      tft.setCursor(100, 195);
      tft.printf("RECORDING...");      
    };
  }

  while(current_screen == 8){ 
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 204 && x < 260 && (240 - y) > 90 && (240 - y) < 150) {
      btn_record = false; 
      current_screen = 5;
    }
  }
}

void Music(){
  tft.pushImage(0, 0, 320, 240, background_playmusic);
  delay(500);

  while(current_screen == 6){ 
    vTaskDelay(50);
    pressed = tft.getTouch(&x, &y);
    if (pressed && x > 0 && x < 43 && (240 - y) > 0 && (240 - y) < 43) {
      current_screen = 1;
    }
  }
}

#endif

