import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [30, "Username must be 30 characters or fewer"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    avatarUrl: { type: String, default:"" },
    bio: {
        type: String,
        default: "",
        maxlength: [300, "Bio must be 300 characters or fewer"],
    },
  },
  { timestamps: true }  
);

export type UserData = InferSchemaType<typeof userSchema>;

const User = (models.User as Model<UserData>) || model<UserData>("User", userSchema);

export default User;