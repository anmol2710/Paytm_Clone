import mongoose from "mongoose";

const userScema = new mongoose.Schema({
    balance:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
    }
})

const Account = mongoose.models.account || mongoose.model("account" , userScema);

export default Account