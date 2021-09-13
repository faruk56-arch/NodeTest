const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for justifytext
const justifySchema = new Schema(
    {
        justifytext: { type: String, require: true },
        created: { type: Date, default: Date.now }
    }
);

const justifyModel = mongoose.model("Justify", justifySchema);

module.exports = justifyModel;   // justifyModel export