const mongoose = require('mongoose');
const Assistant = require('../models/Assistant');
const Shop = require('../models/Shop');
const ShopOwner = require('../models/ShopOwner');

// Yordamchi yaratish
const createAssistant = async (req, res) => {
    try {
        console.log('Create assistant request body:', req.body);
        const { name, phone, username, password, storeId, permissions } = req.body;

        // Ruxsatlarni tekshirish
        let creatorRole;
        let creatorId;

        if (req.admin) {
            if (req.admin.role === 'general') {
                creatorRole = 'general';
                creatorId = req.admin._id;
            } else if (req.admin.permissions.includes('manage_assistants')) {
                creatorRole = 'admin';
                creatorId = req.admin._id;
            } else {
                return res.status(403).json({
                    success: false,
                    message: "Sizda yordamchi qo'shish huquqi yo'q"
                });
            }
        } else if (req.shopOwner) {
            creatorRole = 'shop_owner';
            creatorId = req.shopOwner._id;
        } else {
            return res.status(403).json({
                success: false,
                message: "Sizda yordamchi qo'shish huquqi yo'q"
            });
        }

        // Do'konni tekshirish
        if (typeof storeId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Do'kon ID string formatida bo'lishi kerak"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(storeId)) {
            return res.status(400).json({
                success: false,
                message: "Noto'g'ri do'kon ID formati"
            });
        }

        const shop = await Shop.findById(storeId)
            .populate('owner', 'name');
        
        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Do'kon topilmadi"
            });
        }

        // Do'kon statusini tekshirish
        if (shop.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: "Do'kon faol emas"
            });
        }

        // Do'konga ruxsatni tekshirish
        if (creatorRole === 'shop_owner' && shop.owner._id.toString() !== creatorId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Siz faqat o'zingizning do'koningizga yordamchi qo'sha olasiz"
            });
        }

        // Username uniqueligini tekshirish
        const existingUsername = await Assistant.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Bu username band"
            });
        }

        // Telefon raqam uniqueligini tekshirish
        const existingPhone = await Assistant.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "Bu telefon raqam band"
            });
        }

        // Permissionlarni tekshirish
        let validPermissions = {};
        if (permissions) {
            if (creatorRole === 'shop_owner') {
                // Do'kon egasi faqat o'zining permissionlaridan bera oladi
                const shopOwner = await ShopOwner.findById(creatorId);
                for (let [key, value] of Object.entries(permissions)) {
                    if (shopOwner.permissions[key]) {
                        validPermissions[key] = value;
                    }
                }
            } else {
                // Admin va general barcha permissionlarni bera oladi
                validPermissions = permissions;
            }
        }

        // Yordamchi yaratish
        const assistant = new Assistant({
            name,
            phone,
            username,
            password,
            store: storeId,
            permissions: validPermissions,
            createdBy: {
                role: creatorRole,
                id: creatorId
            }
        });

        await assistant.save();

        // Yordamchi ma'lumotlarini qaytarish
        const populatedAssistant = await Assistant.findById(assistant._id)
            .populate('store', 'name')
            .populate('createdBy.id', creatorRole === 'shop_owner' ? 'name' : 'username fullname');

        res.status(201).json({
            success: true,
            message: "Yordamchi muvaffaqiyatli qo'shildi",
            assistant: {
                id: populatedAssistant._id,
                name: populatedAssistant.name,
                phone: populatedAssistant.phone,
                username: populatedAssistant.username,
                store: {
                    id: populatedAssistant.store._id,
                    name: populatedAssistant.store.name
                },
                storeOwner: {
                    id: shop.owner._id,
                    name: shop.owner.name
                },
                permissions: populatedAssistant.permissions,
                status: populatedAssistant.status,
                createdBy: {
                    role: populatedAssistant.createdBy.role,
                    id: populatedAssistant.createdBy.id._id,
                    name: creatorRole === 'shop_owner' 
                        ? populatedAssistant.createdBy.id.name 
                        : populatedAssistant.createdBy.id.fullname
                },
                createdAt: populatedAssistant.createdAt
            }
        });

    } catch (error) {
        console.error('Assistant creation error:', error);
        res.status(500).json({
            success: false,
            message: "Yordamchi qo'shishda xatolik yuz berdi",
            error: error.message
        });
    }
};

// Yordamchilar ro'yxatini olish
const getAllAssistants = async (req, res) => {
    try {
        // Ruxsatlarni tekshirish
        let query = {};
        
        if (req.admin) {
            if (req.admin.role !== 'general' && !req.admin.permissions.includes('manage_assistants')) {
                return res.status(403).json({
                    success: false,
                    message: "Sizda yordamchilar ro'yxatini ko'rish huquqi yo'q"
                });
            }
        } else if (req.shopOwner) {
            // Do'kon egasi faqat o'z do'konidagi yordamchilarni ko'ra oladi
            const shops = await Shop.find({ owner: req.shopOwner._id });
            query.store = { $in: shops.map(shop => shop._id) };
        } else {
            return res.status(403).json({
                success: false,
                message: "Sizda yordamchilar ro'yxatini ko'rish huquqi yo'q"
            });
        }

        // Query parametrlarini olish
        const { storeId, status, search } = req.query;

        // Do'kon bo'yicha filtrlash
        if (storeId) {
            if (typeof storeId !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: "Do'kon ID string formatida bo'lishi kerak"
                });
            }

            if (!mongoose.Types.ObjectId.isValid(storeId)) {
                return res.status(400).json({
                    success: false,
                    message: "Noto'g'ri do'kon ID formati"
                });
            }

            // Do'kon egasi uchun tekshirish
            if (req.shopOwner) {
                const shop = await Shop.findOne({ _id: storeId, owner: req.shopOwner._id });
                if (!shop) {
                    return res.status(403).json({
                        success: false,
                        message: "Siz faqat o'z do'koningiz yordamchilarini ko'ra olasiz"
                    });
                }
            }

            query.store = storeId;
        }

        // Status bo'yicha filtrlash
        if (status && ['active', 'inactive'].includes(status)) {
            query.status = status;
        }

        // Qidiruv
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        // Yordamchilarni olish
        const assistants = await Assistant.find(query)
            .populate('store', 'name')
            .populate('createdBy.id', 'name username fullname')
            .sort({ createdAt: -1 });

        // Do'kon egalarining ma'lumotlarini olish
        const storeIds = [...new Set(assistants.map(a => a.store._id.toString()))];
        const shops = await Shop.find({ _id: { $in: storeIds } })
            .populate('owner', 'name')
            .lean();

        // Shoplar map'ini yaratish
        const shopsMap = shops.reduce((acc, shop) => {
            acc[shop._id.toString()] = shop;
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            count: assistants.length,
            assistants: assistants.map(assistant => ({
                id: assistant._id,
                name: assistant.name,
                phone: assistant.phone,
                username: assistant.username,
                store: {
                    id: assistant.store._id,
                    name: assistant.store.name
                },
                storeOwner: {
                    id: shopsMap[assistant.store._id.toString()].owner._id,
                    name: shopsMap[assistant.store._id.toString()].owner.name
                },
                permissions: assistant.permissions,
                status: assistant.status,
                createdBy: {
                    role: assistant.createdBy.role,
                    id: assistant.createdBy.id._id,
                    name: assistant.createdBy.role === 'shop_owner' 
                        ? assistant.createdBy.id.name 
                        : assistant.createdBy.id.fullname
                },
                createdAt: assistant.createdAt
            }))
        });

    } catch (error) {
        console.error('Get assistants error:', error);
        res.status(500).json({
            success: false,
            message: "Yordamchilar ro'yxatini olishda xatolik yuz berdi",
            error: error.message
        });
    }
};

module.exports = {
    createAssistant,
    getAllAssistants
};
