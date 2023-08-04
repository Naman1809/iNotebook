const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://namankukreja01:mIMLYIxJEIXoYo89@cluster0.idk2n9q.mongodb.net/inotebook?retryWrites=true&w=majority";
// const connectToMongo = () =>{

//     try {
//         mongoose.set('strictQuery', false)
//         mongoose.connect(mongoURI)
//         console.log('Mongo connected')
//     } catch(error) {
//         console.log(error)

//     }
// }
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to mongodb");
  });
};
module.exports = connectToMongo;
