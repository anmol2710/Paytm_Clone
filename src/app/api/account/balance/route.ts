import Account from "@/model/accountModel";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST(req:Request){
    const body = await req.json();
    const {token} = body;
    const account = await Account.findOne({
        user:token
    })
    try {
        if(!account){
            return Response.json({"message":"Inavlid account" , status:false})
        }
        else{
            return Response.json({"message":account.balance , status:true})
        }
    } catch (error) {
        return Response.json({"message":"Something went wrong" , status:false})
    }
    
}