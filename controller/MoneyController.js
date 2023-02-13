import { insertTransaction, findAllTransaction, uptransDateOneTransaction, deleteOneTransaction } from "../models/TransactionDao.js";

//! POST
//! original
// export const createTransaction = (req, res) => {
//     const {
//         transValue,
//         transCategory,
//          transDate,
//          transTime
//     } = req.body;

//     insertTransaction({
//         transValue: req.body.transValue,
//         transCategory: req.body.transCategory,
//         transDate: req.body.transDate,
//         transTime: req.body.transTime,
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
        const { transID, transValue, transCategory, transDate, transTime } = req.body;
        const id = await insertTransaction({ transID, transValue, transCategory, transDate, transTime });
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
export const uptransDateTransaction = async (req, res) => {
    try {
        const id = req.body.id;
        console.log(req.body);
        await uptransDateOneTransaction(id, req.body);
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


