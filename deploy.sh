#!/bin/bash

EXPRESS_PORT=8081 PLAYER_NAME='Nikhil' DEFENCE_ARRAY_LENGTH=8 node players/app.js & 
EXPRESS_PORT=8082 PLAYER_NAME='Mihir' DEFENCE_ARRAY_LENGTH=8 node players/app.js & 
EXPRESS_PORT=8083 PLAYER_NAME='Amit' DEFENCE_ARRAY_LENGTH=7 node players/app.js & 
EXPRESS_PORT=8084 PLAYER_NAME='Joey' DEFENCE_ARRAY_LENGTH=7 node players/app.js & 
EXPRESS_PORT=8085 PLAYER_NAME='Chandler' DEFENCE_ARRAY_LENGTH=6 node players/app.js & 
EXPRESS_PORT=8086 PLAYER_NAME='Vivek' DEFENCE_ARRAY_LENGTH=6 node players/app.js & 
EXPRESS_PORT=8087 PLAYER_NAME='Russel' DEFENCE_ARRAY_LENGTH=5 node players/app.js & 
EXPRESS_PORT=8088 PLAYER_NAME='Pritam' DEFENCE_ARRAY_LENGTH=5 node players/app.js & 

