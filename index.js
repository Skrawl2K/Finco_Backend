import express from 'express'
import multer from 'multer'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import { verifyToken } from './util/token.js'
import cookieParser from 'cookie-parser'
import { auth, encrypt } from './middleware/auth.js'
import { loginUser, registerUser, editUser, deleteUser, baseUser } from './controller/UserController.js'
import { getTransaction, createTransaction, updateTransaction, deleteTransaction } from './controller/MoneyController.js'


const PORT = process.env.PORT
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
const formToBody = multer({ dest: './public' })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public")
    },
});

// define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
const upload = multer({ storage: storage }).single("image");

app.use(cors({
    origin: true,
    // methods: true,
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use('/public', express.static('./public'))


//! Transaction - CRUD -------------------------------------------------------------------------------------

app.get('/api/transaction', getTransaction)

app.post('/api/transaction', multer.single('image'), formToBody.buffer(), auth, createTransaction);
app.put('/api/transaction', auth, updateTransaction);
app.delete('/api/transaction', auth, deleteTransaction);


//! User - CRUD -------------------------------------------------------------------------------------

app.post('/api/login', formToBody.none(), encrypt, loginUser)
app.post('/api/register', upload, formToBody.buffer(), encrypt, (req, res) => {
    // add the buffer here
    req.body.profilePicture = req.file.buffer;
    registerUser(req, res);
}, registerUser);

app.put('/api/edit', encrypt, verifyToken, editUser);
app.delete('/api/delete', verifyToken, deleteUser);
app.get('/api/user', baseUser, (req, res) => {
    // Do something with the parsed data
    const data = req.body;

    // Return aresponse accordingly 
    res.json({ success: true });
})


app.listen(PORT, () => console.log("The server is running on port:", PORT))
