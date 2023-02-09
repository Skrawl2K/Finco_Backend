import { MongoClient } from "mongodb"
import '../config/config.js';

const url = process.env.MONGO_URI;
const database = process.env.MONGO_DB;

const client = new MongoClient(url)

let db

export const getDb = () => {
    return new Promise((resolve, reject) => {
        if (db) resolve(db)
        client.connect()
            .then(() => {
                db = client.db(database)
                resolve(db)
            })
            .catch((err) => reject(err))
    })
}
