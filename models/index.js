const path = require("path");
const fs = require("fs");
const sequelize = require("../util/db");
const models = {};

module.exports = (() => {
    if(!Object.keys(models).length) {
        const files = fs.readdirSync(__dirname);
        const excluded = [".", "..", "index.js"];

        for(const fileName of files) {
            if(!excluded.includes(fileName) && path.extname(fileName) === ".js") {
                const model = require(path.join(__dirname, fileName));
                models[model.name] = model;
            }
        }

        Object.keys(models).forEach(modelName => {
            if(typeof models[modelName].associate === "function") {
                models[modelName].associate(models);
            }
        });
    }

    models.User = require("./user.js");
    models.Product = require("./product.js");
    models.Cart = require("./cart.js");
    models.CartItem = require("./cart-item.js");
    models.Order = require("./order.js");
    models.OrderItem = require("./order-item.js");

    models.User.hasMany(models.Product)
    models.Product.belongsTo(models.User, {constraints: true, onDelete: 'CASCADE'})
    models.User.hasOne(models.Cart)
    models.Cart.belongsTo(models.User)
    models.Cart.belongsToMany(models.Product, {through: models.CartItem})
    models.Product.belongsToMany(models.Cart, {through: models.CartItem})

    models.Order.belongsToMany(models.Product, {through: models.OrderItem})
    models.User.hasMany(models.Order)
    models.Order.belongsTo(models.User)
    models.Product.belongsToMany(models.Order, {through: models.OrderItem})
    return models;
})()
