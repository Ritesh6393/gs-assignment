const express = require('express');
const { registerUser, loginUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
