const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verify_token');

const {
    root,
    getAllPhone,
    getPhoneById,
    addPhone,
    updatePhone,
    deletePhone,
   
} = require("../controllers/phone_controller");

const {
    register,
    login,
    profile,
} = require("../controllers/auth_controller")

router.get("/", root);
router.get("/phones",verifyToken, getAllPhone);
router.get("/phone/:id",verifyToken, getPhoneById);
router.get("/profile", verifyToken, profile);

router.post("/phone", verifyToken, addPhone);
router.post("/register", register);
router.post("/login", login);


router.put("/phone/:id",verifyToken,  updatePhone);

router.delete("/phone/:id",verifyToken, deletePhone);

module.exports = router;
