# bamazon

<h2>Description</h2>
Amazon-like storefront using MySQL and npm inquirer. The app will take in orders from customers and deplete stock from the store's inventory. 
The second part of the app has additional functionality with a manager mode.
These modes can be accesed from the starting screen.

<h2>Execute insturctions</h2>
In order to use the app it is required to instal Inquirer and MySQL npm packages.
To start the app execute using the commands "node bamazonApp.js"

<h2>Customer interface</h2>
Allows the user to view a table with the inventory item IDs, descriptions, price and department in which the item is located.
After that the user can purchase one or several products and continue or exit.
If there are not enough stock for a product a message will be displayed and the program will return the user to the previous screen .

<h2>Manager Interace</h2>
This mode allows the user to:
- View product available for sale in a table with the same info as the customer mode.
- View low inventory for stock under qty: 4.
- Add or remove inventory quantities.
- Add a new product to the list.
