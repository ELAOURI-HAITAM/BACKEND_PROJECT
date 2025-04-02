const mongoose = require("mongoose");

const connect = async ()=> {
    return await mongoose.connect(process.env.MONGO_URI+process.env.DB_NAME);
}

connect().then(()=> {
    console.log("db connected!")
}).catch(err=> {
    console.log(err.message);
});