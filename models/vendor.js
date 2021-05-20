const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        unique: true
    },
    password: String
});

module.exports = mongoose.model("Vendor", VendorSchema);