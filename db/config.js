const mongoose = require("mongoose");

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // UseCreateIndex: true
        });
        console.log('Db Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar DB');

    }
}
module.exports = {
    dbConnection
}