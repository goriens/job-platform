import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, minlength: 2, maxlength: 50 },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["applicant", "admin"],
      default: "applicant",
    },

    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },

    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

/* Indexes */
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1, status: 1 });

/* Hash password */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordChangedAt = new Date();
});

/* Verify password */
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

/* Safe JSON */
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
