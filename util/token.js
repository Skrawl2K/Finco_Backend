import jwt from 'jsonwebtoken'

// export const createToken = (user) => {
//     const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '15min' })
//     return token
// }

export const createToken = (email) => {
    const token = jwt.sign({ email: email._id }, process.env.JWT_SECRET, { expiresIn: '15min' })
    return token
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}