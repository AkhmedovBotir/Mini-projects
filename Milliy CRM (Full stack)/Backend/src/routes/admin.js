const express = require('express');
const router = express.Router();
const { login, createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes (faqat general admin uchun)
router.post('/create', auth, createAdmin);
router.get('/list', auth, getAllAdmins);
router.get('/:id', auth, getAdminById);
router.put('/:id', auth, updateAdmin);
router.delete('/:id', auth, deleteAdmin);

module.exports = router;
