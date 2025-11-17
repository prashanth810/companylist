import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    companyImages: {
        type: [String], // URLs of images
    },

    description: {
        type: String,
        required: true,
    },

    industry: {
        type: String,
        required: true,
    },

    companyType: {
        type: String, // Private, Public, Startup, etc.
        required: true,
    },

    foundedYear: {
        type: Number,
        required: true,
    },

    employeesCount: {
        type: String, // "10-50", "51-200"
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    website: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    socialLinks: {
        facebook: String,
        instagram: String,
        linkedin: String,
        twitter: String,
    },

    rating: {
        type: Number,
        default: 0,
    },

    reviews: [
        {
            type: String,
        },
    ],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true, minimize: false });

const CompanyModel = mongoose.model("Company", CompanySchema);
export default CompanyModel;

