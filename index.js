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

app.get('/api/topic', getTransaction)
app.post('/api/topic', formToBody.single('image'), createTransaction);
app.put('/api/topic', updateTransaction);
app.delete('/api/topic', deleteTransaction); //!not in place


app.listen(PORT, () => console.log("The server is running on port:", PORT))
