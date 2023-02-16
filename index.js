import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import cors from 'cors'
import { encrypt } from './middleware/auth.js'
import { getTransaction, createTransaction, updateTransaction, deleteTransaction } from './controller/MoneyController.js'
import { loginUser, registerUser, editUser, deleteUser } from './controller/UserController.js'
import { verifyToken } from './util/token.js'


const PORT = process.env.PORT
const app = express()
const formToBody = multer({ dest: './public' })
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', express.static('./public'))


//! Topic - CRUD -------------------------------------------------------------------------------------

app.get('/api/transaction', getTransaction)
//! formToBody needs to be used in conjunction with multer to send form data correctly
app.post('/api/transaction', formToBody.none(), createTransaction);
app.put('/api/transaction', updateTransaction);
app.delete('/api/transaction', deleteTransaction);


//! User - CRUD -------------------------------------------------------------------------------------

app.post('/api/login', formToBody.none(), encrypt, verifyToken, loginUser)
app.post('/api/register', formToBody.none(), encrypt, registerUser);
app.put('/api/edit', encrypt, verifyToken, editUser);
app.delete('/api/delete', verifyToken, deleteUser);


app.listen(PORT, () => console.log("The server is running on port:", PORT))
