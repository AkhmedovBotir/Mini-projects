const express = require('express');
const router = express.Router();
const { createAssistant, getAllAssistants } = require('../controllers/assistantController');
const auth = require('../middleware/auth');
const shopOwnerAuth = require('../middleware/shopOwnerAuth');

// Protected routes (admin va do'kon egasi uchun)
router.post('/create', [auth, shopOwnerAuth], createAssistant);
router.get('/list', [auth, shopOwnerAuth], getAllAssistants);

module.exports = router;
