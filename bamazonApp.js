var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user:"root",
	password: "456244546",
	database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "Access as:",
		choices: [
			"Customer",
			"Manager",
			"Administrator",
			"Quit"
		]
	}).then(function(answer){
		switch(answer.action){
			case "Customer":
				customerStart();
				break;

			case "Manager":
				customerStart();
				break;

			case "Administrator":
				customerStart();
				break;

			case "Quit":
				console.log("See you soon!")
				connection.end();
				break;
		}
	});
}

function customerStart(){
	var table = new Table({
	  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
	         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
	         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
	         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
	});

	table.push(
			["Product ID", "Product Name", "Department", "Price", "Stock"]
		);

	var query = "SELECT id, product_name, department_name, price, stock_quantity FROM products";

	connection.query(query, function(err,res){
		for (var i = 0; i < res.length; i++) {

			table.push(
			    [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}
		console.log(table.toString());
	});
	setTimeout(function(){ inquireUser(); }, 5);
}

function inquireUser(){

	inquirer.prompt([{
		name: "ID",
		type: "input",
		message: "\nPlease select the ID of the product\n",
		validate: function(value){
			if (isNaN(value) === false) {
            	return true;
        	}
        	return false;
		}
	},
	{
		name: "number",
		type: "input",
		message: "How many would you like? (Q to quit)\n",
		validate: function(value){
			if (isNaN(value) === false || value==="Q") {
            	return true;
        	}
        	return false;
		}
	}]).then(function(answer){

		if(answer.number>0){
			checkStock(answer.ID, answer.number );
		}
		else if (answer.number==="Q"){
			console.log("\nSee you soon!\n");
			connection.end();
		}
		else{
			console.log("Please introduce a quantity higher than zero");
			inquireUser();
		}
	});
}

function checkStock(ID, quantity){
	if(quantity==="Q"){
		console.log("\nSee you soon!\n");
		connection.end();
		return;
	}
	var query="SELECT stock_quantity FROM products WHERE ?";
	connection.query(query, {id: ID}, function(err,res){
		var newQty=res[0].stock_quantity-quantity;
		if (newQty>=0) {

			updateStock(ID, newQty, quantity);
		}
		else{
			console.log("Not enough stock!\n");
			inquireUser();
		}
	})
}

function updateStock(ID, newQty, purQty){
	var query="UPDATE products SET ?  WHERE ?";
	connection.query(query, [{
		stock_quantity: newQty
	},{
		id: ID
	}], 
	function(err,res){
	if(err){
			console.log(err);
		}
		else{
			connection.query("SELECT product_name FROM products WHERE ?",{id:ID},function(err, res){
				console.log("\nThank you for your purchase\n");
				console.log("You adquired "+purQty+" units of "+res[0].product_name+"\n");
			})
			setTimeout(function(){ continueBuying(); }, 5);
		}
	});
}

function continueBuying(){
	inquirer.prompt({
		name: "choice",
		type: "list",
		message: "Would you like to continue shopping?",
		choices: ["Continue","Quit"]
	}).then(function(answer){
		switch(answer.choice){
			case "Continue":
				customerStart();
				break;
			case "Quit":
				console.log("\nSee you soon!");
				connection.end();
		}
	});
}
