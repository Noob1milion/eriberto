
const mongoose = require('mongoose');


const dbconnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('Connected to database');
     
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database');
    }

   
}
module.exports = {dbconnection};