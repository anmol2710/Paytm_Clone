import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export default async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to Database")
        return;
    }
    else{
        try {
            const db = await mongoose.connect("mongodb://127.0.0.1:27017/paytm")
            connection.isConnected = db.connections[0].readyState;
            
            console.log("DB Connected")
        } catch (error) {
            
            console.log("Database Connection Failed" , error)
            process.exit(1);
            
        }
    }
}