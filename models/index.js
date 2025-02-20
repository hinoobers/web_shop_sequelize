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
})()