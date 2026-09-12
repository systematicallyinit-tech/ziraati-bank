import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Define the user schema
const formUploadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name is required"],
    },
    accountOpeningForm: {
      name: { type: String },
            url: { type: String },
            key: { type: String },
            size: { type: String },
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);


// Export the User model
const FormUpload = mongoose.models.FormUpload || mongoose.model('FormUpload', formUploadSchema);
export default FormUpload;
