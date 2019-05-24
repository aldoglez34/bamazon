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
connection.connect(function (error) {
    if (error) throw error;

    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {

    // display header
    console.log("\n-----------------------------------");
    console.log("B A M A Z O N   M A N A G E R")
    console.log("-----------------------------------\n");

    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Select an option:",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add new product"
        ]
    }).then(function (answer) {

        switch (answer.option) {

            case "View products for sale":
                viewProducts();
                break;

            case "View low inventory":
                lowInventory();
                break;

            case "Add to inventory":
                addInventory();
                break;

            case "Add new product":
                addNewProduct();
                break;

        }
    });
}

// 
function viewProducts() {

    connection.query("SELECT * FROM products;", function (error, data) {

        if (error) throw error;

        console.log("\n-----------------------------------");
        console.log("These are all the products in the DB: ");
        console.log("-----------------------------------\n");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | " + data[i].price + " | " + data[i].stock_quantity);
        }

        // re-prompt the user for if they want to bid or post
        // start();

        connection.end();
    });
}

function lowInventory() {

    connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function (error, data) {

        if (error) throw error;

        console.log("\n-----------------------------------");
        console.log("Products with stock lower than 5: ");
        console.log("-----------------------------------\n");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | " + data[i].price + " | " + data[i].stock_quantity);
        }

        // re-prompt the user for if they want to bid or post
        // start();

        connection.end();
    });
}

function addInventory() {

    connection.query("SELECT * FROM products;", function (error, data) {

        if (error) throw error;

        console.log("\n-----------------------------------");
        console.log("These are all the products in the DB: ");
        console.log("-----------------------------------\n");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | " + data[i].price + " | " + data[i].stock_quantity);
        }

        console.log("\n");

        // call inquirer and ask for an id
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "Type an id:"
            },
            {
                name: "units",
                type: "input",
                message: "How many units would you like to add?"
            }
        ]).then(function (answer) {

            let id = answer.id;
            let newUnits = parseInt(answer.units);

            // get the stock quantity of the id selected
            for (var i = 0; i < data.length; i++) {

                if (data[i].id == id) {
                    newUnits += parseInt(data[i].stock_quantity);
                }
            }

            // insert data into the database
            connection.query("UPDATE products SET stock_quantity = " + newUnits + " WHERE id = " + id + ";", function (error) {

                console.log("Units added successfully.");

                connection.end();

            });

        });

        // re-prompt the user for if they want to bid or post
        // start();

    });
}

function addNewProduct() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Name of the product: "
        },
        {
            name: "department",
            type: "input",
            message: "Department: "
        },
        {
            name: "price",
            type: "input",
            message: "Price: "
        },
        {
            name: "stock",
            type: "input",
            message: "Inicial stock: "
        }
    ]).then(function (answer) {

        let product_name = answer.name;
        let department_name = answer.department;
        let price = parseFloat(answer.price);
        let stock_quantity = parseInt(answer.stock);

        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + product_name + "', '" + department_name + "', " + price + ", " + stock_quantity + ");", function (error, data) {

            if (error) throw error;

            console.log("Product added successfully.")

            connection.end();
        });

    });

}