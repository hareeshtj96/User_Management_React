import express from 'express';
const router = express.Router();
import { AdminProtect } from '../Middleware/adminAuth.js';




import {
    authAdmin,
    logoutAdmin,
    userlist,
    updateUser,
    createUser,
    deleteUser,
} from '../Controllers/adminController.js';


router.post('/login', authAdmin);
router.post('/logout', logoutAdmin);
router.get('/userlist', userlist);
router.post('/userlist', AdminProtect, createUser);
router.patch('/userlist/:userId', AdminProtect, updateUser)
router.delete('/userlist/:userId', AdminProtect, deleteUser)

export default router;