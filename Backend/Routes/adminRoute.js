import express from 'express';
const router = express.Router();



import {
    authAdmin,
    logoutAdmin,
    userlist,
    createUser,
    updateUser,
    deleteUser,
} from '../Controllers/adminController.js';

router.post('/login', authAdmin);
router.post('/logout', logoutAdmin);
router.get('/userlist', userlist);
router.post('/userlist', createUser);
router.put('/userlist/:userId', updateUser)
router.delete('/userlist/:userId', deleteUser)

export default router;