import { getDb } from '../util/db';
import { createToken } from '../util/db.js';


//! USER-POST-LOGIN
export const login = async (req, res) => {
    const user = req.body
    const db = await getDb()
    const dbUser = await db.collection('user').findOne({ username: user.username })

    if (dbUser === null || dbUser.password !== user.password)
        res.status(401).end()
    else {
        const token = createToken(dbUser)
        res.json({ token })
    }
}


//! USER-PUT-SIGNUP
export const register = async (req, res) => {
    const user = req.body;
    const db = await getDb();
    const dbUser = await db.collection('user').findOne({ username: user.username });
    console.log(dbUser);
    if (dbUser !== null) res.status(401).end();
    const result = await db.collection('user').insertOne(user);
    res.json(result);

}

