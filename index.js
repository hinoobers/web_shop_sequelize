const mysql2 = require("mysql2");
const Sequelize = require("sequelize");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = require("./util/db");
const models = require("./models/index");
sequelize.models = models;

app.use((req, res, next) => {
    models.User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
});

const productAdminRoutes = require("./routes/admin/products");
app.use("/admin", productAdminRoutes);

const productRoutes = require("./routes/products");
app.use(productRoutes);

const shopRoutes = require("./routes/shop");
app.use(shopRoutes);

const orderRoutes = require("./routes/orders");
app.use(orderRoutes);


sequelize.sync().then(() => {
    return models.User.findByPk(1);
}).then(user => {
    if(!user) {
        return models.User.create({name: "Max", email: ""});
    }
    return user;
}).then((user) => {
    user.createCart();
    return user.getCart();
}).then((cart) => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
});
