const commentService = require("../services/commentService");
const redisClient = require("../utils/redis")
const addComent = async (req, res) => {
    try {
        const info = req.user;
        const body = req.body;
        await commentService.addComent(info, body);
        await redisClient.del("comments");
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
        const cachedData = await redisClient.get("comments");
        if (cachedData != null) {
            return res.status(200).json(JSON.parse(cachedData));
        }
        const id = req.params.id;
        const data = await commentService.getComent(id);

        await redisClient.set("comments", JSON.stringify(data)); // Cache for 1 hour

        return res.status(201).send(data);

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).send(error);
        }
    }
};

module.exports = {getComent,addComent}