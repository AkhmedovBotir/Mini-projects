const jwt = require('jsonwebtoken');
const ShopOwner = require('../models/ShopOwner');
const mongoose = require('mongoose');
const { SHOP_OWNER_PERMISSIONS, STATIC_PERMISSIONS } = require('../config/permissions');

// Do'kon egasi yaratish
const createShopOwner = async (req, res) => {
    try {
        // Faqat general admin va manage_shop_owners huquqi borlar yarata oladi
        if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shop_owners')) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon egasini yaratish huquqi yo'q"
            });
        }

        const { name, phone, username, password, permissions = [], status = 'active' } = req.body;

        // Asosiy maydonlar validatsiyasi
        if (!name || !phone || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Barcha maydonlar to'ldirilishi shart"
            });
        }

        // Username validatsiyasi
        if (username.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Username kamida 3 ta belgidan iborat bo'lishi kerak"
            });
        }

        // Parol validatsiyasi
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
            });
        }

        // Telefon raqam validatsiyasi
        if (!/^\+998[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri telefon raqam formati. Format: +998901234567"
            });
        }

        // Status validatsiyasi
        if (!['active', 'inactive', 'blocked'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri status"
            });
        }

        // Username band emasligini tekshirish
        const existingOwner = await ShopOwner.findOne({ username });
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "Bu username band"
            });
        }

        // Telefon raqam band emasligini tekshirish
        const existingPhone = await ShopOwner.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "Bu telefon raqam band"
            });
        }

        // Yangi do'kon egasi obyekti
        const shopOwner = new ShopOwner({
            name,
            phone,
            username,
            password,
            status,
            createdBy: req.admin.id
        });

        // Ruxsatlarni validatsiya qilish
        const invalidPermissions = shopOwner.validatePermissions(permissions);
        if (invalidPermissions.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri ruxsatlar berilgan: " + invalidPermissions.join(', '),
                validPermissions: SHOP_OWNER_PERMISSIONS
            });
        }

        // Ruxsatlarni o'rnatish
        shopOwner.permissions = permissions;

        await shopOwner.save();

        // Javob qaytarish
        res.status(201).json({
            success: true,
            message: "Do'kon egasi muvaffaqiyatli yaratildi",
            shopOwner: {
                id: shopOwner._id,
                name: shopOwner.name,
                phone: shopOwner.phone,
                username: shopOwner.username,
                permissions: shopOwner.permissions,
                status: shopOwner.status
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Do'kon egasi login
const loginShopOwner = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Do'kon egasini bazadan topish
        const shopOwner = await ShopOwner.findOne({ username });
        
        if (!shopOwner) {
            return res.status(401).json({
                success: false,
                message: "Noto'g'ri username yoki password"
            });
        }

        // Parolni tekshirish
        const isMatch = await shopOwner.checkPassword(password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Noto'g'ri username yoki password"
            });
        }

        // Status tekshirish
        if (!shopOwner.isActive()) {
            return res.status(403).json({
                success: false,
                message: "Sizning akkauntingiz bloklangan yoki faol emas"
            });
        }

        // Login vaqtini yangilash
        shopOwner.lastLogin = new Date();
        await shopOwner.save();

        // Token yaratish
        const token = jwt.sign(
            { 
                id: shopOwner._id,
                username: shopOwner.username,
                permissions: shopOwner.permissions,
                status: shopOwner.status
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            shopOwner: {
                id: shopOwner._id,
                name: shopOwner.name,
                phone: shopOwner.phone,
                username: shopOwner.username,
                permissions: shopOwner.permissions,
                status: shopOwner.status
            },
            message: "Muvaffaqiyatli login qilindi"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Barcha do'kon egalarini olish
const getAllShopOwners = async (req, res) => {
    try {
        // Faqat general admin va manage_shop_owners huquqi borlar ko'ra oladi
        if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shop_owners')) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon egalarini ko'rish huquqi yo'q"
            });
        }

        const shopOwners = await ShopOwner.find({}, '-password -__v')
            .populate('createdBy', 'username fullname')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            shopOwners: shopOwners.map(owner => ({
                id: owner._id,
                name: owner.name,
                phone: owner.phone,
                username: owner.username,
                permissions: owner.permissions,
                status: owner.status,
                createdBy: owner.createdBy,
                createdAt: owner.createdAt,
                lastLogin: owner.lastLogin
            })),
            total: shopOwners.length,
            message: "Do'kon egalari ro'yxati muvaffaqiyatli olindi"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Do'kon egasi ruxsatlarini o'zgartirish
const updateShopOwnerPermissions = async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;

        // ID validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri ID formati"
            });
        }

        // Ruxsatlarni tekshirish
        if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shop_owners')) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon egasi ruxsatlarini o'zgartirish huquqi yo'q"
            });
        }

        // Do'kon egasini topish
        const shopOwner = await ShopOwner.findById(id);
        if (!shopOwner) {
            return res.status(404).json({
                success: false,
                message: "Do'kon egasi topilmadi"
            });
        }

        // Ruxsatlarni validatsiya qilish
        const invalidPermissions = shopOwner.validatePermissions(permissions);
        if (invalidPermissions.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri ruxsatlar berilgan: " + invalidPermissions.join(', '),
                validPermissions: SHOP_OWNER_PERMISSIONS
            });
        }

        // Ruxsatlarni o'zgartirish
        shopOwner.permissions = permissions;
        await shopOwner.save();

        res.json({
            success: true,
            message: "Do'kon egasi ruxsatlari muvaffaqiyatli o'zgartirildi",
            permissions: shopOwner.permissions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Mavjud ruxsatlar ro'yxatini olish
const getAvailablePermissions = async (req, res) => {
    try {
        res.json({
            success: true,
            permissions: SHOP_OWNER_PERMISSIONS,
            staticPermissions: STATIC_PERMISSIONS,
            message: "Mavjud ruxsatlar ro'yxati"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Do'kon egasini o'zgartirish
const updateShopOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, username, password, status } = req.body;

        // ID validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri ID formati"
            });
        }

        // Ruxsatlarni tekshirish
        if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shop_owners')) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon egasini o'zgartirish huquqi yo'q"
            });
        }

        // Do'kon egasini topish
        const shopOwner = await ShopOwner.findById(id);
        if (!shopOwner) {
            return res.status(404).json({
                success: false,
                message: "Do'kon egasi topilmadi"
            });
        }

        // Telefon raqam validatsiyasi
        if (phone && !/^\+998[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri telefon raqam formati. Format: +998901234567"
            });
        }

        // Username validatsiyasi
        if (username && username.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Username kamida 3 ta belgidan iborat bo'lishi kerak"
            });
        }

        // Parol validatsiyasi
        if (password && password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
            });
        }

        // Status validatsiyasi
        if (status && !['active', 'inactive', 'blocked'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri status"
            });
        }

        // Username band emasligini tekshirish
        if (username && username !== shopOwner.username) {
            const existingOwner = await ShopOwner.findOne({ username });
            if (existingOwner) {
                return res.status(400).json({
                    success: false,
                    message: "Bu username band"
                });
            }
        }

        // Telefon raqam band emasligini tekshirish
        if (phone && phone !== shopOwner.phone) {
            const existingPhone = await ShopOwner.findOne({ phone });
            if (existingPhone) {
                return res.status(400).json({
                    success: false,
                    message: "Bu telefon raqam band"
                });
            }
        }

        // Ma'lumotlarni yangilash
        if (name) shopOwner.name = name;
        if (phone) shopOwner.phone = phone;
        if (username) shopOwner.username = username;
        if (password) shopOwner.password = password;
        if (status) shopOwner.status = status;

        await shopOwner.save();

        res.json({
            success: true,
            message: "Do'kon egasi muvaffaqiyatli o'zgartirildi",
            shopOwner: {
                id: shopOwner._id,
                name: shopOwner.name,
                phone: shopOwner.phone,
                username: shopOwner.username,
                permissions: shopOwner.permissions,
                status: shopOwner.status
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Bitta do'kon egasini olish
const getShopOwner = async (req, res) => {
    try {
        const { id } = req.params;

        // ID validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri ID formati"
            });
        }

        // Ruxsatlarni tekshirish
        if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shop_owners')) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon egasini ko'rish huquqi yo'q"
            });
        }

        // Do'kon egasini topish
        const shopOwner = await ShopOwner.findById(id, '-password -__v')
            .populate('createdBy', 'username fullname');

        if (!shopOwner) {
            return res.status(404).json({
                success: false,
                message: "Do'kon egasi topilmadi"
            });
        }

        res.json({
            success: true,
            shopOwner: {
                id: shopOwner._id,
                name: shopOwner.name,
                phone: shopOwner.phone,
                username: shopOwner.username,
                permissions: shopOwner.permissions,
                status: shopOwner.status,
                createdBy: shopOwner.createdBy,
                createdAt: shopOwner.createdAt,
                lastLogin: shopOwner.lastLogin
            },
            message: "Do'kon egasi ma'lumotlari muvaffaqiyatli olindi"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Do'kon egasi statusini o'zgartirish
const updateShopOwnerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // ID validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri ID formati"
            });
        }

        // Ruxsatlarni tekshirish
        if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shop_owners')) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon egasi statusini o'zgartirish huquqi yo'q"
            });
        }

        // Status validatsiyasi
        if (!status || !['active', 'inactive'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status 'active' yoki 'inactive' bo'lishi kerak"
            });
        }

        // Do'kon egasini topish
        const shopOwner = await ShopOwner.findById(id);
        if (!shopOwner) {
            return res.status(404).json({
                success: false,
                message: "Do'kon egasi topilmadi"
            });
        }

        // Statusni o'zgartirish
        shopOwner.status = status;
        await shopOwner.save();

        res.json({
            success: true,
            message: `Do'kon egasi statusi muvaffaqiyatli ${status === 'active' ? "faollashtirildi" : "to'xtatildi"}`,
            shopOwner: {
                id: shopOwner._id,
                name: shopOwner.name,
                phone: shopOwner.phone,
                username: shopOwner.username,
                permissions: shopOwner.permissions,
                status: shopOwner.status
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Do'kon egasini o'chirish
const deleteShopOwner = async (req, res) => {
    try {
        const { id } = req.params;

        // ID validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri ID formati"
            });
        }

        // Ruxsatlarni tekshirish
        if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shop_owners')) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon egasini o'chirish huquqi yo'q"
            });
        }

        // Do'kon egasini topish
        const shopOwner = await ShopOwner.findById(id);
        if (!shopOwner) {
            return res.status(404).json({
                success: false,
                message: "Do'kon egasi topilmadi"
            });
        }

        // Do'kon egasini o'chirish
        await ShopOwner.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Do'kon egasi muvaffaqiyatli o'chirildi",
            deletedShopOwner: {
                id: shopOwner._id,
                name: shopOwner.name,
                phone: shopOwner.phone,
                username: shopOwner.username
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

module.exports = {
    createShopOwner,
    loginShopOwner,
    getAllShopOwners,
    updateShopOwnerPermissions,
    getAvailablePermissions,
    updateShopOwner,
    getShopOwner,
    updateShopOwnerStatus,
    deleteShopOwner
};
