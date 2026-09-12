import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Define the user schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: [true, "Full name is required"],
    },
    img: {
      type: String,
      default: "avatar.jpg",
    },
    accountNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Number,
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
    available: {
      type: Number,
      default: 0,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
      },
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
  },
);

// Set referral link before saving
userSchema.pre('save', function (next) {
  if (this.isModified('username') || this.isNew) {
    this.referral_link = `${process.env.NEXT_PUBLIC_BASE_URL}signup?ref=${this.username}`;
  }
  next();
});

// Mongoose Middleware for Password Hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = 12;
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to verify password
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT
userSchema.methods.generateToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
     expiresIn: '1d', // Token expires in 1 day
   });
};

// Method to get account info
userSchema.methods.getAccountInfo = function () {
  return {
    full_name: this.full_name,
    username: this.username,
    email: this.email,
    balance: this.balance,
    withdrawal: this.withdrawal,
    deposit: this.deposit,
    wallet_address: {
      bitcoin_BTC: this.bitcoin_BTC,
      binance_BNB: this.binance_BNB,
      tron_TRX: this.tron_TRX,
      ethereum_ETH: this.ethereum,
      tether_USDT: this.tether_USDT
    },
    kyc: {
      date_of_birth: this.date_of_birth,
      phone: this.phone,
      zip_code: this.zip_code,
      address: this.address,
      state: this.state,
      country: this.country,
      document_type: this.document_type,
      identity_file: this.identity_file,
    },
    earnings: this.earnings,
    active_deposit: this.active_deposit,
    total_deposit: this.total_deposit,
    total_withdrawal: this.total_withdrawal,
    total_referral: this.total_referral,
    active_referral: this.active_referral,
    commissions: this.commissions,
    referral_link: this.referral_link,
    role: this.role,
  };
};

// Export the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
