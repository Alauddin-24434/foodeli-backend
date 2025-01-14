import { model, Schema } from "mongoose";
import { IFoodItem, IReview } from "./foodItem.interface";


// Review Schema
const reviewSchema = new Schema<IReview>({
    userId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    profileImage: { type: String, required: true },
    comment: { type: String, default: "" },
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

// Food Item Schema
const foodItemSchema = new Schema<IFoodItem>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    
    // Define the thumbnailImage and additionalImages fields correctly
    thumbnailImage: { type: String, required: true }, // assuming it is a required field
    additionalImages: { type: [String], default: [] }, // assuming it's an array of image URLs

    description: { type: String, default: null },
    reviews: { type: [reviewSchema], default: [] }, // Start with an empty array
    isAvailable:{type:Boolean, default:true}
}, {
    timestamps: true,
});

// Model creation
const FoodItemModel = model<IFoodItem>('FoodItem', foodItemSchema);

export default FoodItemModel;
