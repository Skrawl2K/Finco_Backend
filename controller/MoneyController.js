import { insertTransaction, findAllTransaction, updateOneTransaction, removeTransaction } from "../models/TransactionDao.js";

//! POST
export const createTransaction = (req, res) => {
    const {
        topic,
        text,
        author,
        topicCreationDate
    } = req.body;

    insertTransaction({
        topic: req.body.topic,
        text: req.body.text,
        author: req.body.author,
        // image: req.file.path,
        topicCreationDate: new Date(topicCreationDate)
    }).then((id) => {
        console.log("Insert success");
        res.json({ id });
    }).catch((err) => {
        console.error(err);
        // 500 - Internal Server Error
        res.status(500).send("Error while fetching data");
    })
}

//! GET
export const getTransaction = (_, res) => {
    findAllTransaction()
        .then((topics) => res.json(topics))
        .catch((err) => {
            console.error(err);
            // 500 - Internal Server Error
            res.status(500).send("Error while getting all topics");
        })
}

//! PUT
// /api/contact/:id
export const updateTransaction = (req, res) => {
    const id = req.params.id;
    updateOneTransaction(id, req.body)
        .then(() => {
            res.status(200).send();
        })
        .catch(() => {
            res.status(500).send("Error while updating a contact");
        })
}


//! DELETE
export const deleteTransaction = () => {
    return null;
}

