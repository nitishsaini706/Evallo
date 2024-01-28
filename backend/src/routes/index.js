const express = require("express");

const router = express.Router();

const authRoute = require("../routes/authRoute"); 
const contentRoute = require("../routes/contentRoute"); 
const commentRoute = require("../routes/commentRoute"); 

router.use('/auth', authRoute);

router.use('/content', contentRoute);
router.use('/comment', commentRoute);

module.exports = router;
