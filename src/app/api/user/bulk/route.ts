import User from "@/model/userModel";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST(req:Request) {
    const body = await req.json();
    const {id,filter} = body;
    
    console.log(filter)
    const users = await User.find({
        _id: { $ne: id },
        name: {
            "$regex": filter,
            "$options": "i"
        }
    });
    return Response.json({users});
}