import express from 'express';
import { test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import {updateUser} from '../controllers/user.controller.js'
const router = express.Router();

router.get('/test', test);

//fro verifcation of user at update user details ie dsashboard page
router.put('/update/:userId',verifyToken,updateUser);

export default router;