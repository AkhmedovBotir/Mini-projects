const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    try {
        // Token mavjudligini tekshirish
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                message: "Token topilmadi" 
            });
        }

        // Tokenni ajratib olish va tekshirish
        const token = authHeader.replace('Bearer ', '').trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Admin ma'lumotlarini bazadan olish
        const admin = await Admin.findById(decoded._id);
        if (!admin) {
            return res.status(401).json({ 
                success: false,
                message: "Admin topilmadi" 
            });
        }

        // Admin statusini tekshirish
        if (admin.status !== 'active') {
            return res.status(401).json({ 
                success: false,
                message: "Adminning statusi faol emas" 
            });
        }

        // Admin ma'lumotlarini request ga qo'shish
        req.admin = admin;
        req.token = token;
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ 
            success: false,
            message: "Avtorizatsiyadan o'tilmagan" 
        });
    }
};

module.exports = auth;
