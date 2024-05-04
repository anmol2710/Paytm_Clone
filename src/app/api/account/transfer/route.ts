import Account from "@/model/accountModel";

export async function POST(req: Request) {
    const body = await req.json();
    const { amount, to, from, name } = body;
    
    if(amount <= 0){
        return Response.json({"message":"Amount must be greater than 0" , "status":false})
    }

    try {
        const fromAccount = await Account.findOne({ user: from });

        if (!fromAccount) {
            return Response.json({ "message": "Account is invalid", "status": false });
        } else if (fromAccount.balance < amount) {
            return Response.json({ "message": "Insufficient fund", "status": false });
        }
        
        const toAccount = await Account.findOne({ user: to });

        if (!toAccount) {
            return Response.json({ "message": "Account is invalid", "status": false });
        }

        // Update balances
        await Account.findOneAndUpdate({ user: from }, {$inc: {balance : -amount}});
        await Account.findOneAndUpdate({ user: to }, {$inc: {balance : amount}});
        
        // Push transactions
        await Account.findOneAndUpdate(
            { user: from },
            { $push: { transactions: { amount: -amount, name: toAccount.name, account: to } } }
        );
        await Account.findOneAndUpdate(
            { user: to },
            { $push: { transactions: { amount: amount, name: fromAccount.name, account: from } } }
        );
    } catch (error) {
        return Response.json({ "message": "Transfer failed", "status": false });
    }
    return Response.json({ "message": "Transfer Successful", "status": true });
}
