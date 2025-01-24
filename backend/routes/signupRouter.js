import express from 'express';
const router = express.Router();
import signupController from '../controllers/signupController.js';

router.get('/', signupController.addUser, (req, res) => {
  return res.redirect('./signup');
});

router.post('/', signupController.addUser, (req, res) => {});

export default router;
