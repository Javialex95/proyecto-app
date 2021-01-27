const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.BD_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB conectada')
        
    } catch (error) {
        console.log(error);
        process.exit(1); //detener la app
    }
}

module.exports = conectarDB;