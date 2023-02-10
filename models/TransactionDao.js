import { getDb } from "../util/db.js";
import mongodb from "mongodb";

export const insertTransaction = (transaction) => {
    return new Promise((resolve, reject) => {
        getDb()
            .then((db) => db.collection("transaction").insertOne(transaction))
            .then((result) => {
                console.log("TransactionDao - insertTransaction result")
                resolve(result.insertedId)
            })
            .catch((err) => reject(err))
    })
}

export const findAllTransaction = () => {
    return new Promise((resolve, reject) => {
        getDb()
            .then((db) => db.collection('transaction').find())
            .then((transaction) => transaction.toArray())
            .then((transactionArray) => resolve(transactionArray))
            .catch((err) => reject(err))
    });
}

export const updateOneTransaction = (id, updateTransaction) => {
    console.log(id);
    const filter = { "_id": mongodb.ObjectId(id) };

    const updateDoc = {
        $set: updateTransaction
    }
    return new Promise((resolve, reject) => {
        getDb()
            .then((db) => {
                console.log("Updating Transaction");
                return db.collection("transaction").updateOne(filter, updateDoc)
            })
            .then((result) => {
                console.log("Updated Transaction");
                console.log(result);
                resolve()
            })
            .catch((err) => reject(err));
    });
}

export const deleteOneTransaction = async (id) => {
    try {
        await getDb()
            .then((db) => db.collection("transaction").deleteOne({ "_id": mongodb.ObjectId(id) }));
    } catch (err) {
        throw err;
    }
}



