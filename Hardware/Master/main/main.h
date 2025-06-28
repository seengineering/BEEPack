/*
 * main.h
 *
 *  Created on: 8 Apr 2025
 *      Author: KURAPIKA
 */

#ifndef MAIN_MAIN_H_
#define MAIN_MAIN_H_
#include "freertos/FreeRTOS.h"
#include "freertos/semphr.h"
#include "freertos/queue.h"

#include "sim800c.h"
#include "dht22.h"
#include "HX711.h"
#include "gps.h"
#include "getWebServerData.h"
#include "esp_now.h"
#include "smsControl.h"

#define WIFI_SSID      "TOPNET_3D78"
#define WIFI_PASSWORD  "Hafiene2025"
#define WIFI_CONNECTED_BIT BIT0
extern SemaphoreHandle_t sim800_uart_mutex;
extern char ip_address[];
extern int user_id;

typedef struct {
    float temperature;
    float humidity;
} DHTData_t;

typedef struct {
    float latitude;
    float longitude;
} GPSData_t;
// In your main.h or at the top of your file
typedef struct {
    char sensor_id[12];
    float temperature;
    float humidity;
    float longitude;
    float latitude;
} ESPNowData_t;

typedef struct {
    int min_temp;
    int max_temp;
    int min_humidity;
    int max_humidity;
    int min_weight;
    int max_weight;
    bool is_alerts_on;
    double latitude;   
    double longitude; 
} AlertConfig_t;

extern QueueHandle_t dhtQueue;
extern QueueHandle_t gpsQueue;
extern QueueHandle_t espnowQueue;
extern QueueHandle_t alertConfigQueue;  // Declare if in a header



#endif /* MAIN_MAIN_H_ */
