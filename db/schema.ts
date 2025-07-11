import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true, default: false },
  image: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

const sessionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  userId: { type: String, required: true, ref: "User" },
  activeOrganizationId: { type: String }
});

const accountSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  accountId: { type: String, required: true },
  providerId: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
  accessToken: { type: String },
  refreshToken: { type: String },
  idToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  refreshTokenExpiresAt: { type: Date },
  scope: { type: String },
  password: { type: String },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

const verificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  identifier: { type: String, required: true },
  value: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);
export const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);
export const Verification = mongoose.models.Verification || mongoose.model("Verification", verificationSchema);
