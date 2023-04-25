# StaffBuyingClient

First, a few words about full project. It provides the making of various cables and their purchase. It consists of two large parts:  

1) Part for seller - https://github.com/TimmyGray/Lovely_Wires; https://github.com/TimmyGray/Lovely_wires_server;  
2) Part for customer - https://github.com/TimmyGray/Buying_Client; https://github.com/TimmyGray/Dotnet_Server; https://github.com/TimmyGray/BuyingLibrary;  
Each part contains front and backend with joint mongo database. Most of features implemented, but not all. If something does't work correctly or doesn't work at all -  
please, write me!In additional,i is writing(Not yet finished) this pet-project for show to potential employer my hard skills. So, it is not real app you should use in your business,ofc=)  
 
This is frontend for server app that you can find by this link https://github.com/TimmyGray/Dotnet_Server  
In general, this app allow to looking for the purchase, creating the custom cables, adding selected purchase to cart and making orders(with the clients information), which are then stored in in database  
If you click on current purchase you will see detailed information. Every time, when you adding or removing purchase from/to cart - the total price is changing  
On the cart page you can see list of added purchases. By click on the purchase it add/remove from current order with calculating total price. When the order created - the customer recieve a mail with the order deatails  
The buys sorting doesn't implement yet  
Also, not of all validation implement  
You can't see list of buys on the main page until you(seller) created, at least, one buy with the app for seller(Lovely wire, Lovely wire server)  
Your's possibility to creating custom cable also depends on created cable components with the app for seller  

How to run:  
1) Clone this repo  
2) Install node.js from official site  
3) Run "npm i" in app dir  
4) If you want to use both front and back - clone Dotnet_server repo in the other directory, run server by info from readme  
5) Run 'npm start' if you want to run app using test angular server or run 'ng build' if you want use your own server. (You can use server from simple server dir and run 'node server.js porttolisten(optional)')

There are dev and prod(must be created environment.prod.ts file) environments in environments dir. For set backend server adress, you should change "apiUrl" to needed value.
For using production environment, run 'ng serve --configuration=production' or 'ng build --configuration=production'

Stack:Angular(angular material), typescript, rxjs, some additional css styles 
