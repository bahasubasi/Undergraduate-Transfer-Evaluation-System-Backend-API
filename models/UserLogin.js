const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    password: { type: String, required: true },
    userType: { type: String, required: true },
    username: { type: String, required: true },
});

const users = mongoose.model('users', usersSchema);
module.exports = users;