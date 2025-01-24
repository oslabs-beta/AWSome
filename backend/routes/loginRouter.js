import express from 'express';
import loginController from '../controllers/loginController.js';
const router = express.Router();

router.get('/', loginController.authenticate, (req, res) => {
  console.log('test');
  return res.json({ redirectTo: '/' });
});

router.post('/', loginController.authenticate, (req, res) => {});

export default router;
