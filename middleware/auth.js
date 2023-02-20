import { createHmac } from 'crypto'
import jwt from 'jsonwebtoken'

export const encrypt = (req, _, next) => {
    console.log("log", req.body);
    const hmac = createHmac('sha256', req.body.password)
    req.body.password = hmac.digest('hex')
    next()
}

export const auth = (req, res, next) => {
    const token = req.cookies.token
    console.log("authenticate");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        console.error(err)
        res.status(401).end()
    }


}