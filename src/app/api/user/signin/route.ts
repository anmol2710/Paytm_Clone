import { NextRequest } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect"
import User from "@/model/userModel"

dbConnect();

const SignupSchema = z.object({
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

    const {email , password} = body;

    let user = await User.findOne({email});
    if(!user){
        return Response.json({"message":"User not exist" , status:false})
    }
    else{
        return Response.json({"message":user._id , "status":true})
    }
    
}