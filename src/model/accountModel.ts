import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const userScema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    transactions: [transactionSchema]
})

const Account = mongoose.models.account || mongoose.model("account" , userScema);

export default Account