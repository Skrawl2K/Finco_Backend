import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import cors from 'cors'
import { verifyToken } from './util/token.js'
import cookieParser from 'cookie-parser'
import { auth, encrypt } from './middleware/auth.js'
import { loginUser, registerUser, editUser, deleteUser, baseUser } from './controller/UserController.js'
import { getTransaction, createTransaction, updateTransaction, deleteTransaction } from './controller/MoneyController.js'



const PORT = process.env.PORT
const app = express()
app.use(cookieParser())
const formToBody = multer({ dest: './public' })
app.use(cors({
    origin: true,
    // methods: true,
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
console.log("errorHunter");
app.post('/api/login', formToBody.none(), encrypt, loginUser)
app.post('/api/register', formToBody.none(), encrypt, registerUser);
app.put('/api/edit', encrypt, verifyToken, editUser);
app.delete('/api/delete', verifyToken, deleteUser);
app.get('/api/user', baseUser)


app.listen(PORT, () => console.log("The server is running on port:", PORT))
