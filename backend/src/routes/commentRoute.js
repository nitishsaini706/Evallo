const express = require("express");
const contentController = require("../controllers/commentController");
const { verifyToken } = require("../utils/middleware");

const router = express.Router();

router.post('/add', verifyToken, contentController.addComent);
router.get('/:id', verifyToken, contentController.getComent);

module.exports = router;