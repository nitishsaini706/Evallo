const Comment = require("../model/comment")

const addComent = async (auth, body) => {
    try {

        const comment = new Comment({
            comment: body.comment,
            commentedBy: auth._id,
            content: body.content, // Assuming you have user information in req.user
        });
        await comment.save();

    } catch (error) {
        console.log("error in adding comment");
        throw error;
    }
};
const getComent = async (id) => {
    try {

        const comments = await Comment.find({ content: id }).populate('commentedBy','name');
        return comments ?? [];

    } catch (error) {
        console.log("error in adding comment");
        throw error;
    }
};

module.exports = {addComent,getComent}