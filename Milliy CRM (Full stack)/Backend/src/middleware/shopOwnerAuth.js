const ShopOwner = require('../models/ShopOwner');

// Do'kon egasi autentifikatsiyasi
const shopOwnerAuth = async (req, res, next) => {
    try {
        // Agar admin yoki general bo'lsa, o'tkazib yuborish
        if (req.admin) {
            return next();
        }

        // Token orqali do'kon egasini topish
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return next(); // Token bo'lmasa ham davom etish (admin uchun)
        }

        const shopOwner = await ShopOwner.findOne({
            'tokens.token': token,
            status: 'active'
        });

        if (!shopOwner) {
            return next(); // Do'kon egasi topilmasa ham davom etish (admin uchun)
        }

        req.shopOwner = shopOwner;
        next();

    } catch (error) {
        console.error('Shop owner auth error:', error);
        res.status(401).json({
            success: false,
            message: 'Autentifikatsiya xatosi',
            error: error.message
        });
    }
};

module.exports = shopOwnerAuth;
