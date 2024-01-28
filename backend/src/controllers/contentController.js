const { contentSchema, contentListSchema } = require("../utils/validate")
const contentService = require("../services/contentService");
const redisClient = require("../utils/redis")

const content = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    try {
        const { error, value } = contentSchema.validate(req.body);
        if(error){
            return res.status(400).send(error);
        }
        const authInfo = req.user;
        await contentService.addContent(value, authInfo);
        await redisClient.del("list");
        await redisClient.del("adminList");
        console.log('ff', )
        return res.status(201).send('Content created successfully');
    } catch (error) {
        return res.status(500).send(error);
    }
};

const list = async (req, res) => {
    
    try {
        const cachedData = await redisClient.get("list");
        if (cachedData != null) {
            return res.status(200).json(JSON.parse(cachedData));
        }
        const data = await contentService.getContent();
        await redisClient.set("list", JSON.stringify(data));
        return res.status(201).send(data);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const adminList = async (req, res) => {
    try {
        const cachedData = await redisClient.get("adminList");
        if (cachedData != null) {
            return res.status(200).json(JSON.parse(cachedData));
        }
        const info = req.user;
        const data = await contentService.getAdminContent(info);
        await redisClient.set("adminList", JSON.stringify(data));
        if (data) {
            
            return res.status(201).send(data);
        }
    } catch (error) {
        console.error(error); 
        if (!res.headersSent) {
            return res.status(500).send(error); 
        }
    }
};
const deleteContent = async (req, res) => {
    try {
        const info = req.user;
        const body = req.body;
        const data = await contentService.deleteContent(info,body);
        if (data) {
            await redisClient.del("adminList");
            await redisClient.del("list");
            return res.status(201).send(data);
        }else{
            return res.status(401).send("You dont have authorization to delete")
        }
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).send(error);
        }
    }
};
const editContent = async (req, res) => {
    try {
        const info = req.user;
        const body = req.body;
        const data = await contentService.editContent(info, body);
        if (data) {
            await redisClient.del("adminList");
            await redisClient.del("list");
            return res.status(201).send(data);
        } else {
            return res.status(401).send("You dont have authorization to delete")
        }
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).send(error);
        }
    }
};

module.exports = { content, list, adminList, deleteContent, editContent };