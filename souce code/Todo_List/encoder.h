#ifndef ENCODER_H
#define ENCODER_H

#include "global_vars.h"

#define pinA  34  // Connected to CLK on KY-040
#define pinB  35  // Connected to DT on KY-040
 
int pinALast;  
int aVal;

void Encoder_volume() {
   aVal = digitalRead(pinA);
   if (aVal != pinALast){ // Means the knob is rotating
     // if the knob is rotating, we need to determine direction
     // We do that by reading pin B.
     if (digitalRead(pinB) != aVal) {  // Means pin A Changed first - We're Rotating Clockwise
       if(volume<17) volume ++;
     } else {// Otherwise B changed first and we're moving CCW
       if(volume>0) volume--;
     }

     Serial.print("volume: ");
     Serial.println(volume);
     
   } 
   pinALast = aVal;

}

#endif