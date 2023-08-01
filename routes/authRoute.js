import express from 'express'
// import {registerController} from '../controllers/authController'
import {registerController} from '../controllers/authController.js';

// router object seperate file me routing krne pr routing ka obj bnana pafta hai
const router = express.Router();

// routing 
// REGISTER || METHOD POST
router.post('/register',registerController)

export default router;