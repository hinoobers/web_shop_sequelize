const mysql2 = require("mysql2");
const Sequelize = require("sequelize");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize("mysql://root@localhost:3306/joga_sequelize");
sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});
app.get("/", (req, res) => {
    res.json({message: "Hi!"})
});

// get all articles
app.get("/article", (req, res) => {

});

// get article by slug
app.get("/article/:slug", (req, res) => {

});

// get author’s articles by author id
app.get("/author/:id", (req, res) => {

});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
})