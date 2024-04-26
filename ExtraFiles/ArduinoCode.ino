#include <OneWire.h>

#define ONE_WIRE_BUS 4

OneWire oneWire(ONE_WIRE_BUS);

#define TRIG 2
#define ECHO 3

#define TEMP A1

#define RED_PIN 9
#define GREEN_PIN 10
#define BLUE_PIN 11

void setup(void)
{
  Serial.begin(9600);

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);

  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

void loop(void){ 
  for(int i = 0; i < 256; i++){
    Setcolour(i,0,0);
    delay(2);
  }

  float distance = LoopAndGetAverage();
  Setcolour(0,0,255);
  delay(50);

  String dist, temp;
  int temp_adc;
  float temp_val;
  dist = distance;

  temp_adc = analogRead(TEMP);

  temp_val = (temp_adc * 4.88);
  temp_val = (temp_val/10);
  temp = temp_val;

  // Serial.println(dist + "," + temp);

  Serial.println(dist);

  int tempory = 255;

  for(int i = 0; i < 256; i++){
    Setcolour(0,0,tempory-i);
    delay(2);
  }

  // delay(30 * 60 * 1000);
}

void Setcolour(int red, int green, int blue){
  analogWrite(RED_PIN, red);
  analogWrite(GREEN_PIN, green);
  analogWrite(BLUE_PIN, blue);
}

float LoopAndGetAverage(){
  float distTotal = 0;

  float numOfDistances = 10;

  for(int i = 0; i < numOfDistances; i++){
    digitalWrite(TRIG,LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG,HIGH);
    delayMicroseconds(5);
    digitalWrite(TRIG,LOW);

    float t = pulseIn(ECHO, HIGH);
    float distance = t * 0.017015;

    distTotal += distance;

    // delay(50);
  }

  return distTotal / numOfDistances;
}