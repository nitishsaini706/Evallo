const { contentSchema, contentListSchema } = require("../utils/validate")
const contentService = require("../services/contentService");

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
        return res.status(201).send('Content created successfully');
    } catch (error) {
        return res.status(500).send(error);
    }
};

const list = async (req, res) => {
    
    try {
        
        const data = await contentService.getContent();
        return res.status(201).send(data);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const adminList = async (req, res) => {
    try {
        const info = req.user;
        const data = await contentService.getAdminContent(info);
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