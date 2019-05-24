var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {

    if (err) throw err;

    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {

    connection.query("SELECT * FROM products WHERE stock_quantity > 0;", function (error, data) {

        if (error) throw error;

        // displaying items for sale
        console.log("\n-----------------------------------");
        console.log("W E L C O M E   T O   B A M A Z O N")
        console.log("-----------------------------------");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | " + data[i].price + " | " + data[i].stock_quantity);
        }
        console.log("-----------------------------------\n");

        // calling inquirer
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What product would you like to buy? (type the id)"
            },

            {
                type: "input",
                name: "units",
                message: "How many units?"
            }
        ]).then(function (answer) {

            // get the stock quantity
            connection.query("SELECT * FROM products WHERE id = " + answer.id + ";", function (error, data) {

                if (error) throw error;

                let stockInDB = data[0].stock_quantity;
                let units = answer.units;
                let itemPrice = data[0].price;

                if (units > stockInDB) {

                    console.log("\nInsufficient quantity! There are only " + stockInDB + " units in the DB.");
                }
                else {

                    // update the database
                    let remainingStock = stockInDB - units;

                    connection.query("UPDATE products SET stock_quantity = " + remainingStock + " WHERE id = " + answer.id, function (error, data) {

                        let total = itemPrice * units;
                        console.log("\nIt will be a total of: " + total);

                        console.log("\nThank you for purchasing here.");
                    });
                }

                connection.end();
            });
            // ? start();
        });
    });
}