import { insertTransaction, findAllTransaction, updateOneTransaction, deleteOneTransaction } from "../models/TransactionDao.js";

//! POST
//! original
// export const createTransaction = (req, res) => {
//     const {
//         money,
//         category,
//          date,
//          time
//     } = req.body;

//     insertTransaction({
//         money: req.body.money,
//         category: req.body.category,
//         date: req.body.date,
//         time: req.body.time,
//     }).then((id) => {
//         console.log("Insert success");
//         res.json({ id });
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).send("Error while fetching data");
//     })
// }

//! new
export const createTransaction = async (req, res) => {
    console.log("request:", req.body);
    try {
        const { money, category, date, time } = req.body;
        const id = await insertTransaction({ money, category, date, time });
        console.log("Insert success");
        res.json({ id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while fetching data");
    }
}



//! GET
//! original
// export const getTransaction = (_, res) => {
//     findAllTransaction()
//         .then((transaction) => res.json(transaction))
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send("Error while getting all transactions");
//         })
// }

//! new
export const getTransaction = async (_, res) => {
    try {
        const transaction = await findAllTransaction();
        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while getting all transactions");
    }
}



//! PUT (transport via application/json)
export const updateTransaction = async (req, res) => {
    try {
        const id = req.body.id;
        console.log(req.body);
        await updateOneTransaction(id, req.body);
        res.status(200).send();
    } catch (error) {
        res.status(500).send("Error while updating a transaction");
    }
}



//! DELETE (transport via application/json)
export const deleteTransaction = async (req, res) => {
    try {
        const id = req.body.id;
        await deleteOneTransaction(id);
        res.status(200).send();
    } catch (error) {
        res.status(500).send("Error while deleting a transaction");
    }
}


