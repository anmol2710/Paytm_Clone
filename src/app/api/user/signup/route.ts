import { NextRequest } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect"
import User from "@/model/userModel"
import Account from "@/model/accountModel"

dbConnect();

const SignupSchema = z.object({
    name:z.string(),
    email: z.string().email(),
    password:z.string().min(8)
});

export async function POST(req:NextRequest){

    const body = await req.json();
    try {
        const isValid = SignupSchema.parse(body)
    } catch (error) {
        return Response.json({
            "message":"Inavlid Inputs",
            "status":false
        })
    }

    const {name , email , password} = body;
    console.log(name + email + password)
    let user = await User.findOne({email});
    if(user){
        return Response.json({"message":"User already exist" , status:false})
    }

    const newuser = await User.create({name , email , password});
    console.log(newuser)
    await Account.create({
        user:newuser._id,
        balance:10000,
        name
    })
    if(newuser){
        return Response.json({"message":newuser._id , "status":true})
    }
    else{
        return Response.json({"message":"Something went wrong" , "status":false})
    }
}