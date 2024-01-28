const commentService = require("../services/commentService");

const addComent = async (req, res) => {
    try {
        const info = req.user;
        const body = req.body;
        await commentService.addComent(info, body);
        return res.status(201).send("comment added succesfully");
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).send(error);
        }
    }
};
const getComent = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await commentService.getComent(id);


        return res.status(201).send(data);

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).send(error);
        }
    }
};

module.exports = {getComent,addComent}