const express = require("express");
const router = express.Router();

const {
    initialEnpoint,
    getAllUsers,
    loginHandler,
    registerHandler,
    updateUser,
    deleteUser
} = require("../controllers/user_controller");

router.get("/", initialEnpoint);
router.get("/login", loginHandler);
router.get("/users", getAllUsers);

router.post("/register", registerHandler);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

module.exports = router;
