"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    itemId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FoodItemModel', required: true },
    reviewId: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
});
exports.NotificationModel = (0, mongoose_1.model)('Notification', notificationSchema);
