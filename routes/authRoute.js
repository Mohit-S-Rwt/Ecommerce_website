import express from 'express'
// import {registerController} from '../controllers/authController'
import {registerController , loginController, testController, isAdmin} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';


// router object seperate file me routing krne pr routing ka obj bnana pafta hai
const router = express.Router();

// routing 
// REGISTER || METHOD POST
router.post('/register',registerController);

// LOGIN || post

router.post('/login',loginController);

// test routes
router.get('/test',requireSignIn, isAdmin, testController)

// protected routes
router.get('./user-auth', requireSignIn, (req , res)=>{
    res.status(200).send({ok:true});
})




export default router;