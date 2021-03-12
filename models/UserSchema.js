const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true,trim:true },
    email: { type: String, required: true, unique: true,trim:true },
    password: { type: String, required: true,trim:true},
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);
module.exports = User;