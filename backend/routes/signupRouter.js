import express from 'express';
const router = express.Router();
import signupController from '../controllers/signupController.js';

router.get('/', signupController.getPage, (req, res) => {
  return res.json({ redirectTo: '/Signup' });
});

router.post('/', signupController.addUser, (req, res) => {});

export default router;
