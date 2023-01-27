# Messager
Messager
 You will need the library data to run and work properly.
1 npm i socket.io
2 npm i sequelize(I worked with mysql2) => npm i mysql2
3 npm i express
4 npm i dotenv
5 If you wish, you can download npm i jsonwebtoken I wanted to use it, but then I changed my mind because I didn’t want to create personal accounts

In this assembly, the logic is quite simple, I made a messenger where the user writes a login and a room, the server loads it into the database and then transfers it to react via the router to the room, subsequent users just need to specify their nickname, this can be done by registering on the main page or change it in the link string name="" to your login
