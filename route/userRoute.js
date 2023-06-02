const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middleware/jwtMiddleware')
const {createUser,login,getUser,getOne,updateUser}= require('../controller/userControllers')

router.post('/createUser',createUser)
router.post('/login',login)
router.get('/getUser',verifyToken,getUser)
router.get('/getOne',verifyToken,getOne)
router.put('/updateUser',verifyToken,updateUser)
module.exports = router;