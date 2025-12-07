const mongoose = require('mongoose');
const Shop = require('../models/Shop');
const ShopOwner = require('../models/ShopOwner');

// Do'kon yaratish
const createShop = async (req, res) => {
    try {
        const { name, ownerId, phone, address, tariff } = req.body;

        // Ruxsatlarni tekshirish
        if (!req.admin || (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shops'))) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon yaratish huquqi yo'q"
            });
        }

        // ownerId validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri do'kon egasi ID formati. Iltimos, ro'yxatdan do'kon egasini tanlang"
            });
        }

        // Do'kon egasini tekshirish
        const owner = await ShopOwner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: "Do'kon egasi topilmadi"
            });
        }

        // Do'kon egasining statusini tekshirish
        if (owner.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: "Do'kon egasi faol emas"
            });
        }

        // Telefon raqam validatsiyasi
        if (!/^\+998[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri telefon raqam formati. Format: +998901234567"
            });
        }

        // Manzil validatsiyasi
        if (address.length < 10) {
            return res.status(400).json({
                success: false,
                message: "Manzil kamida 10 ta belgidan iborat bo'lishi kerak"
            });
        }

        // Tarif validatsiyasi
        if (!['Basic', 'Standard', 'Premium'].includes(tariff)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri tarif. Tarif 'Basic', 'Standard' yoki 'Premium' bo'lishi kerak"
            });
        }

        // Do'kon yaratish
        const shop = new Shop({
            name,
            owner: ownerId,
            phone,
            address,
            tariff,
            createdBy: req.admin._id
        });

        await shop.save();

        // Do'kon ma'lumotlarini owner bilan birga qaytarish
        const populatedShop = await Shop.findById(shop._id)
            .populate('owner', 'name phone username')
            .populate('createdBy', 'username fullname');

        res.status(201).json({
            success: true,
            message: "Do'kon muvaffaqiyatli yaratildi",
            shop: {
                id: populatedShop._id,
                name: populatedShop.name,
                owner: populatedShop.owner,
                phone: populatedShop.phone,
                address: populatedShop.address,
                status: populatedShop.status,
                tariff: populatedShop.tariff,
                createdBy: populatedShop.createdBy,
                createdAt: populatedShop.createdAt
            }
        });

    } catch (error) {
        console.error('Shop creation error:', error);
        
        if (error.code === 11000) {
            // Duplicate key error
            if (error.keyPattern.phone) {
                return res.status(400).json({
                    success: false,
                    message: "Bu telefon raqam boshqa do'konga biriktirilgan"
                });
            }
            if (error.keyPattern.name && error.keyPattern.address) {
                return res.status(400).json({
                    success: false,
                    message: "Bu manzilda bunday nomli do'kon mavjud"
                });
            }
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join('. ')
            });
        }

        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
};

// Barcha do'konlarni olish
const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find()
            .populate('owner', 'name phone username')
            .populate('createdBy', 'username fullname')
            .sort('-createdAt');

        res.json({
            success: true,
            count: shops.length,
            shops: shops.map(shop => ({
                id: shop._id,
                name: shop.name,
                owner: shop.owner,
                phone: shop.phone,
                address: shop.address,
                status: shop.status,
                tariff: shop.tariff,
                createdBy: shop.createdBy,
                createdAt: shop.createdAt
            }))
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi"
        });
    }
};

// Do'konni o'chirish
const deleteShop = async (req, res) => {
    try {
        const { shopId } = req.params;

        // Ruxsatlarni tekshirish
        if (!req.admin || (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shops'))) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'konni o'chirish huquqi yo'q"
            });
        }

        // shopId validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri do'kon ID formati"
            });
        }

        // Do'konni tekshirish
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Do'kon topilmadi"
            });
        }

        // Do'konni o'chirish
        await Shop.findByIdAndDelete(shopId);

        res.status(200).json({
            success: true,
            message: "Do'kon muvaffaqiyatli o'chirildi"
        });

    } catch (error) {
        console.error('Shop deletion error:', error);
        res.status(500).json({
            success: false,
            message: "Do'konni o'chirishda xatolik yuz berdi",
            error: error.message
        });
    }
};

// Do'kon statusini o'zgartirish
const updateShopStatus = async (req, res) => {
    try {
        const { shopId } = req.params;
        const { status } = req.body;

        // Ruxsatlarni tekshirish
        if (!req.admin || (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shops'))) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon statusini o'zgartirish huquqi yo'q"
            });
        }

        // shopId validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri do'kon ID formati"
            });
        }

        // Status validatsiyasi
        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status 'active' yoki 'inactive' bo'lishi kerak"
            });
        }

        // Do'konni tekshirish
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Do'kon topilmadi"
            });
        }

        // Statusni yangilash
        shop.status = status;
        await shop.save();

        res.status(200).json({
            success: true,
            message: "Do'kon statusi muvaffaqiyatli o'zgartirildi",
            shop: {
                id: shop._id,
                name: shop.name,
                status: shop.status
            }
        });

    } catch (error) {
        console.error('Shop status update error:', error);
        res.status(500).json({
            success: false,
            message: "Do'kon statusini o'zgartirishda xatolik yuz berdi",
            error: error.message
        });
    }
};

// Bitta do'konni olish
const getShopById = async (req, res) => {
    try {
        const { shopId } = req.params;

        // Ruxsatlarni tekshirish
        if (!req.admin || (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shops'))) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'kon ma'lumotlarini ko'rish huquqi yo'q"
            });
        }

        // shopId validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri do'kon ID formati"
            });
        }

        // Do'konni topish va owner/createdBy ma'lumotlarini populate qilish
        const shop = await Shop.findById(shopId)
            .populate('owner', 'name phone username')
            .populate('createdBy', 'username fullname');

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Do'kon topilmadi"
            });
        }

        res.status(200).json({
            success: true,
            shop: {
                id: shop._id,
                name: shop.name,
                owner: shop.owner,
                phone: shop.phone,
                address: shop.address,
                status: shop.status,
                tariff: shop.tariff,
                createdBy: shop.createdBy,
                createdAt: shop.createdAt
            }
        });

    } catch (error) {
        console.error('Get shop error:', error);
        res.status(500).json({
            success: false,
            message: "Do'kon ma'lumotlarini olishda xatolik yuz berdi",
            error: error.message
        });
    }
};

// Do'konni o'zgartirish
const updateShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const { name, ownerId, phone, address, tariff } = req.body;

        // Ruxsatlarni tekshirish
        if (!req.admin || (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_shops'))) {
            return res.status(403).json({
                success: false,
                message: "Sizda do'konni o'zgartirish huquqi yo'q"
            });
        }

        // shopId validatsiyasi
        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri do'kon ID formati"
            });
        }

        // Do'konni tekshirish
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Do'kon topilmadi"
            });
        }

        // ownerId validatsiyasi
        if (ownerId) {
            if (!mongoose.Types.ObjectId.isValid(ownerId)) {
                return res.status(400).json({
                    success: false,
                    message: "Noto'g'ri do'kon egasi ID formati"
                });
            }

            // Do'kon egasini tekshirish
            const owner = await ShopOwner.findById(ownerId);
            if (!owner) {
                return res.status(404).json({
                    success: false,
                    message: "Do'kon egasi topilmadi"
                });
            }

            // Do'kon egasining statusini tekshirish
            if (owner.status !== 'active') {
                return res.status(400).json({
                    success: false,
                    message: "Do'kon egasi faol emas"
                });
            }
        }

        // Telefon raqam validatsiyasi
        if (phone && !/^\+998[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri telefon raqam formati. Format: +998901234567"
            });
        }

        // Manzil validatsiyasi
        if (address && address.length < 10) {
            return res.status(400).json({
                success: false,
                message: "Manzil kamida 10 ta belgidan iborat bo'lishi kerak"
            });
        }

        // Tarif validatsiyasi
        if (tariff && !['Basic', 'Standard', 'Premium'].includes(tariff)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri tarif. Tarif 'Basic', 'Standard' yoki 'Premium' bo'lishi kerak"
            });
        }

        // Do'konni yangilash
        if (name) shop.name = name;
        if (ownerId) shop.owner = ownerId;
        if (phone) shop.phone = phone;
        if (address) shop.address = address;
        if (tariff) shop.tariff = tariff;

        await shop.save();

        // Yangilangan do'kon ma'lumotlarini owner va admin bilan birga qaytarish
        const updatedShop = await Shop.findById(shopId)
            .populate('owner', 'name phone username')
            .populate('createdBy', 'username fullname');

        res.status(200).json({
            success: true,
            message: "Do'kon muvaffaqiyatli yangilandi",
            shop: {
                id: updatedShop._id,
                name: updatedShop.name,
                owner: updatedShop.owner,
                phone: updatedShop.phone,
                address: updatedShop.address,
                status: updatedShop.status,
                tariff: updatedShop.tariff,
                createdBy: updatedShop.createdBy,
                createdAt: updatedShop.createdAt
            }
        });

    } catch (error) {
        console.error('Shop update error:', error);
        res.status(500).json({
            success: false,
            message: "Do'konni yangilashda xatolik yuz berdi",
            error: error.message
        });
    }
};

module.exports = {
    createShop,
    getAllShops,
    deleteShop,
    updateShopStatus,
    getShopById,
    updateShop
};
