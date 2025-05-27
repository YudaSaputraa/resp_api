const express = require("express");
const router = express.Router();

const {
    root,
    getAllPhone,
    addPhone,
    updatePhone,
    deletePhone,
   
} = require("../controllers/phone_controller");

router.get("/", root);
router.get("/phones", getAllPhone);

router.post("/phone", addPhone);

router.put("/phone/:id", updatePhone);

router.delete("/phone/:id", deletePhone);

module.exports = router;
