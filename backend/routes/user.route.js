//to decie route means the API , sign-up nd point of userimport express from 'express';
import express from 'express';
import { 

    login,
    logout,
    register 

} from '../controller/user.controller.js';



const router = express.Router();
//

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);


export default router;
