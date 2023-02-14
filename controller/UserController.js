import { getDb } from '../util/db.js';
import { ObjectId } from "mongodb"
import { createToken, verifyToken } from '../util/token.js';


const cookieConfig = {
    httpOnly: true,
    sameSite: 'none',
    secure: true
}

//! USER - LOGIN - POST  
export const login = async (req, res) => {
    const user = req.body
    const db = await getDb()
    const dbUser = await db.collection('user').findOne({ email: user.email })

    if (dbUser === null || dbUser.password !== user.password)
        res.status(401).end()
    else {
        const token = createToken(dbUser)
        res.cookie('token', token, cookieConfig)
        res.status(200).end()
    }
}

//! USER - SIGNUP - POST
//! original
// export const register = async (req, res) => {
//     const user = req.body;
//     const db = await getDb();

//     const dbUser = await db.collection('user').findOne({ username: user.username });

//     console.log(dbUser);
//     if (dbUser !== null) res.status(401).end();
//     encrypt(user.password)
//     const result = await db.collection('user').insertOne(user);
//     res.json(result);

// }

//! new
export const register = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        registeredAt: new Date()
    }

    const db = await getDb()
    const result = await db.collection('user').insertOne(user)
    console.log(result);
    res.status(200).end()

}

//Test User: {"name":"Skrawl2K","email":"skrawl2k@bla.de", "password" : " BLARP1234"}

export const baseUser = async (req, res) => {
    const token = req.cookies.token
    const db = await getDb()
    try {
        const result = verifyToken(token)
        console.log(result);
        const dbUser = await db.collection('user').findOne({ _id: new ObjectId(result.user) }, { email: 1 })
        res.status(200).json(dbUser)
    } catch (err) {
        console.error(err)
        res.status(401).end()
    }


}