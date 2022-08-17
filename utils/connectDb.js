import mongoose from "mongoose";

const connectMongo = async () => {
   if(mongoose.connections[0].readyState) {
     console.log("mongoDb is already connected")
   }
   else{
     mongoose.connect(process.env.MONGO_URI);
     console.log("mongoDb connected")
   }
};

export default connectMongo;
