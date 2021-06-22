const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const alienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    forget_password: {
        data: String,
        default: ""
    },
    refreshedToken: {
        data: String,
        default: ""
    },
    acessedToken: {
        data: String,
        default: ""
    }

});
alienSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

const Userdb = mongoose.model('userdb', alienSchema);

module.exports = Userdb;