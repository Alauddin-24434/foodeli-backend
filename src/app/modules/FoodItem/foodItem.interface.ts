import { Document, Schema } from "mongoose";

// Interface for a review
export interface IReview {
    [x: string]: any;
    userId: Schema.Types.ObjectId; // Reference to the user
    username: string;               // Username of the reviewer
    rating: number;                 // Rating should be between 1 and 5
    profileImage: string;           // URL to the reviewer's profile image
    comment?: string;               // Optional comment
    date: Date;                     // Date of the review
}

// Interface for a food item, extending Mongoose Document
export interface IFoodItem extends Document {
    name: string;                   // Name of the food item
    category: string;               // Category of the food item
    price: number;                  // Price of the food item
    thumbnailImage: string;         // URL to the thumbnail image (added based on previous model)
    additionalImages: string[];     // Array of URLs for additional images
    description?: string;           // Optional description
    reviews?: IReview[];            // Array of reviews
    createdAt?: Date;               // Created timestamp, optional
    updatedAt?: Date;               // Updated timestamp, optional
    isAvailable:boolean;
}


export interface IFoodItemInput {
    name: string;                   // Name of the food item
    category: string;               // Category of the food item
    price: number;                  // Price of the food item
    thumbnailImage: string;         // URL to the thumbnail image
    additionalImages: string[];     // Array of URLs for additional images
    description?: string;           // Optional description
}