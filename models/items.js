const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
});

module.exports = mongoose.model("Items", ItemSchema);