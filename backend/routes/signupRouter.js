import express from 'express';
const router = express.Router();
import signupController from '../controllers/signupController.js';

//DELETE THIS ONLY IF LOGIN ROUTER IS DELETED - Jose
// router.get('/', signupController.getPage, (req, res) => {
//   return res.json({ redirectTo: '/Signup' });
// });

// router.post('/', signupController.addUser, (req, res) => {});

export default router;
