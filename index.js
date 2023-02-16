import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import cors from 'cors'
import { auth, encrypt } from './middleware/auth.js'
import { getTransaction, createTransaction, updateTransaction, deleteTransaction } from './controller/MoneyController.js'
import { loginUser, registerUser, editUser, deleteUser } from './controller/UserController.js'
import { verifyToken } from './util/token.js'



const PORT = process.env.PORT
const app = express()
//!-------------------------------------------------------------------------------------
app.use(expressjwt({
    secret: process.env.JWT_SECRET,
}).unless({
    path: ['/'] // Which routes should not be checked
}))
//!-------------------------------------------------------------------------------------
const formToBody = multer({ dest: './public' })
app.use(cors({
    origin: true,
    methods: true,
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', express.static('./public'))


//! Transaction - CRUD -------------------------------------------------------------------------------------

app.get('/api/transaction', auth, getTransaction)
//! formToBody needs to be used in conjunction with multer to send form data correctly
app.post('/api/transaction', formToBody.none(), auth, createTransaction);
app.put('/api/transaction', updateTransaction, auth);
app.delete('/api/transaction', deleteTransaction, auth);


//! User - CRUD -------------------------------------------------------------------------------------

app.post('/api/login', formToBody.none(), encrypt, loginUser)
app.post('/api/register', formToBody.none(), encrypt, registerUser);
app.put('/api/edit', encrypt, verifyToken, editUser);
app.delete('/api/delete', verifyToken, deleteUser);


app.listen(PORT, () => console.log("The server is running on port:", PORT))
