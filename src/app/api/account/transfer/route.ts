import Account from "@/model/accountModel";

export async function POST(req: Request) {
    const body = await req.json();
    const { amount, to, from } = body;
    
    try {
        const fromAccount = await Account.findOne({ user: from });
        console.log(fromAccount)
        if (!fromAccount) {
            return Response.json({ "message": "Account is invalid", "status": false })
        }
        else if (fromAccount.balance < amount) {
            return Response.json({ "message": "Insuffient fund", "status": false })
        }
        
        const toAccount = await Account.findOne({ user: to });
        console.log(toAccount)
        if (!toAccount) {
            return Response.json({ "message": "Account is invalid", "status": false })
        }

        await Account.findOneAndUpdate({ user: from }, {$inc: {balance : -amount}})
        await Account.findOneAndUpdate({ user: to }, {$inc: {balance : amount}})
    } catch (error) {
        return Response.json({ "message": "Transfer failed", "status": false })
    }
    return Response.json({ "message": "Transfer Successfull", "status": true })
}