"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export const notificationController = {
//     // নতুন নোটিফিকেশন তৈরি করা
//     async createNotification(req: Request, res: Response, next: NextFunction) {
//         const { message } = req.body;
//         const notifications = await notificationService.createAdminNotifications(message);
//         sendResponse(res, {
//             statusCode: 201,
//             message: "Notification created successfully!",
//             success: true,
//             data: notifications,
//         });
//     },
//     // নির্দিষ্ট অ্যাডমিনের নোটিফিকেশনগুলো রিটার্ন করা
//     async getAdminNotifications(req: Request, res: Response, next: NextFunction) {
//         const { adminId } = req.params;
//         const notifications = await notificationService.getAdminNotifications(adminId);
//         sendResponse(res, {
//             statusCode: 200,
//             message: "Notifications retrieved successfully!",
//             success: true,
//             data: notifications,
//         });
//     },
//     // নির্দিষ্ট নোটিফিকেশনকে "read" হিসেবে আপডেট করা
//     async markNotificationAsRead(req: Request, res: Response, next: NextFunction) {
//         const { notificationId } = req.params;
//         const updatedNotification = await notificationService.markAsRead(notificationId);
//         sendResponse(res, {
//             statusCode: 200,
//             message: "Notification marked as read!",
//             success: true,
//             data: updatedNotification,
//         });
//     }
// };
