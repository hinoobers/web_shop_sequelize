const mysql2 = require("mysql2");
const Sequelize = require("sequelize");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productAdminRoutes = require("./routes/admin/products");
app.use("/admin", productAdminRoutes);

const productRoutes = require("./routes/products");
app.use(productRoutes);

const sequelize = require("./util/db");
const models = require("./models/index");
sequelize.models = models;

sequelize.sync().then(() => {
    console.log("Database & tables created!");
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
});
