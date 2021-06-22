const Alien = require("./database/model")
const connectDB = require('./database/connection');
connectDB();


Alien.find().then((user) => {
    for (i of user) {
        console.log(i.name)
    }
})