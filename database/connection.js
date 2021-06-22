const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        // mongodb connection string
        const con = await mongoose.connect("mongodb+srv://user-1:12345@cluster0.rowue.mongodb.net/aliendata", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB