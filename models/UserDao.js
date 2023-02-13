import { getDb } from "../util/db.js";
import mongodb from "mongodb";

export const insertUser = (user) => {
    return new Promise((resolve, reject) => {
        getDb()
            .then((db) => db.collection("user").insertOne(user))
            .then((result) => {
                console.log("UserDao - insertUser result")
                resolve(result.insertedId)
            })
            .catch((err) => reject(err))
    })
}

export const findAllUser = () => {
    return new Promise((resolve, reject) => {
        getDb()
            .then((db) => db.collection('user').find())
            .then((transaction) => transaction.toArray())
            .then((transactionArray) => resolve(transactionArray))
            .catch((err) => reject(err))
    });
}

export const updateOneUser = (id, updateUser) => {
    console.log(id);
    const filter = { "_id": mongodb.ObjectId(id) };

    const updateDoc = {
        $set: updateUser
    }
    return new Promise((resolve, reject) => {
        getDb()
            .then((db) => {
                console.log("Updating User");
                return db.collection("user").updateOne(filter, updateDoc)
            })
            .then((result) => {
                console.log("Updated User");
                console.log(result);
                resolve()
            })
            .catch((err) => reject(err));
    });
}

export const deleteOneUser = async (id) => {
    try {
        await getDb()
            .then((db) => db.collection("user").deleteOne({ "_id": mongodb.ObjectId(id) }));
    } catch (err) {
        throw err;
    }
}



