const Content = require("../model/content");

const addContent = async(input,auth)=>{
    try{
        if(input){
            const content = new Content({ ...input, creator: auth._id });
            await content.save();
        }
        return;
    }catch(e){
        console.log("error in content adding service ",e);
        throw e;
    }
};
const getContent = async()=>{
    try{
        const content = await Content.find({status:"published"}).sort({createdAt:-1});
        return content;
    }catch(e){
        console.log("error in content adding service ",e);
        throw e;
    }
};
const getAdminContent = async(auth)=>{
    try{
        const content = await Content.find({ creator :auth._id}).sort({createdAt:-1});
        return content;
    }catch(e){
        console.log("error in content adding service ",e);
        throw e;
    }
};
const deleteContent = async(auth,body)=>{
    try{
        const content = await Content.findById(body._id);
        if(content.creator == auth._id){
            await Content.deleteOne({_id:body._id});
            return true;
        }else{

            return false;
        }
    }catch(e){
        console.log("error in content deleting service ",e);
        throw e;
    }
};
const editContent = async(auth,body)=>{
    try{
        const content = await Content.findById(body._id);
        if(content.creator == auth._id){
            await Content.findByIdAndUpdate(body._id, body, { new: true });
            return true;
        }else{

            return false;
        }
    }catch(e){
        console.log("error in content editing service ",e);
        throw e;
    }
};

module.exports = { addContent, getContent, getAdminContent, deleteContent, editContent }