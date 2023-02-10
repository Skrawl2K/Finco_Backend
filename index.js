import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import cors from 'cors'
import { getTransaction, createTransaction, updateTransaction, deleteTransaction } from './controller/MoneyController.js'

const PORT = process.env.PORT
const app = express()
const formToBody = multer({ dest: './public' })
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', express.static('./public'))


//! CRUD -----------------------------------------------------------------------------------------------

app.get('/api/transaction', getTransaction)
//! formToBody needs to be used in conjunction with multer to send form data correctly !//
app.post('/api/transaction', formToBody.none(), createTransaction);
app.put('/api/transaction', updateTransaction);
app.delete('/api/transaction', deleteTransaction);


app.listen(PORT, () => console.log("The server is running on port:", PORT))
