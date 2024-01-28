const express = require("express");
const contentController = require("../controllers/contentController");
const { verifyToken, verifyAdminToken } = require("../utils/middleware"); 

const router = express.Router();

router.post('/add', verifyToken,contentController.content );
router.get('/list', verifyToken,contentController.list );
router.get('/admin/list', verifyAdminToken,contentController.adminList );
router.post('/admin/delete', verifyAdminToken, contentController.deleteContent );
router.post('/admin/edit', verifyAdminToken, contentController.editContent );



module.exports = router;