import { getDb } from '../util/db.js';
import { ObjectId } from "mongodb"
import { createToken, verifyToken } from '../util/token.js';
// import nodemailer from 'nodemailer';

const cookieConfig = {
    httpOnly: false,
    sameSite: 'none',
    secure: true
}

//! USER - LOGIN - POST  
export const loginUser = async (req, res) => {
    const user = req.body
    const db = await getDb()
    const dbUser = await db.collection('user').findOne({ email: user.email })

    if (dbUser === null || dbUser.password !== user.password)
        res.status(401).end()
    else {
        const token = createToken(dbUser)
        res.cookie('token', token, cookieConfig)

        //Verify the Token 
        const decoded = verifyToken(token)
        if (decoded) {
            res.status(200).end()
        }
        else {
            res.status(401).end();
        }
    }
}

//! USER - SIGNUP - POST
export const registerUser = async (req, res) => {
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

//! MAIL - VERIFICATION
// export const sendVerificationEmail = async (req, res) => {
//     const { email, name } = req.body;

//     let transporter = nodemailer.createTransport({
//         service: process.env.MAIL_SERVICE,
//         auth: {
//             user: process.env.MAIL_EMAIL,
//             pass: process.env.MAIL_PASSWORD
//         },
//     });

//     const verifyToken = crypto.randomBytes(20).toString('hex');
//     const verificationURL = `http://${req.headers.host}/users/verify?token=${verifyToken}`;

//     const mailHTML = `Hi ${name},<br/><br/> 
//   Please click on the link below to verify your email address: <br/><br/> 
//   <a href="${verificationURL}" target="_blank">Click Here to Verify</a><br/><br/> 
//   `;

//     let mailOptions = {
//         to: email,
//         subject: 'Please confirm your Email address',
//         html: mailHTML
//     };

//     await transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.status(403).end();
//         }
//         else {
//             console.log('Message %s sent: %s', info.messageId, info.response);
//             User.findOneAndUpdate({ email }, { $set: { verifyToken } }, { new: true, upsert: true }, (err, doc) => {
//                 if (err) res.status(500).json(err);
//                 else {
//                     res.status(200).json(doc);
//                 }
//             });
//         }
//     });
// };

//! TEST USER ____________________________________________________________
//name: Skrawl2K
//email: kimkevinkoslowski@gmail.com
//password: BLARP1234
//!______________________________________________________________________

//! USER - EDIT - PUT (transport via application/json)
export const editUser = async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    console.log("log entry:", req.body);

    const userInfo = {
        name: name,
        email: email,
        password: password
    };

    const db = await getDb();
    const dbUser = await db.collection('user').findOne({ email: req.body.email });
    if (dbUser !== null) {
        const result = await db.collection('user').updateOne(
            { _id: ObjectId(dbUser._id) },
            { $set: userInfo });
        res.json(result);
    }
    else {
        res.status(401).end();

    }
}

//! USER - DELETE - DELETE (transport via application/json)
export const deleteUser = async (req, res) => {
    const email = req.body.email;
    const db = await getDb();
    const dbUser = await db.collection('user').findOne({ email: req.body.email });
    if (dbUser !== null) {
        const result = await db.collection('user').deleteOne({ _id: ObjectId(dbUser._id) });
        res.json(result);
    }
    else {
        res.status(401).end();
    }
}
