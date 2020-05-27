const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    fullname:String,
    gmail:String,
    password:String,
    googleid:String,
    thumbnail:String,
    projects:Array,
    tasks:Array
})

const users = mongoose.model("users",usersSchema);

module.exports = {
    users:users
}