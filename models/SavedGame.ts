import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const GAME_STATUSES = ["Want to Play", "Playing", "Completed", "Dropped"] as const;

const savedGameSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",        
        required: [true, "A saved game belongs to a user"],  
    },
    rawgId: {
        type: Number,
        required: [true, "RAWG game ID is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    coverUrl: { type: String, default: "" },
    genres: { type: [String], default: [] },
    status: {
        type: String,
        enum: {
            values: GAME_STATUSES,
            message: "{VALUE} is not a valid status",
        },
        default: "Want to play",
    },
    isFavorite: { type: Boolean, default: false },
    rating: {
        type: Number,
        default: null,
        min: [0.5, "Rating must be at least 0.5"],
        max: [5, "Rating can't be more than 5"],
        validate: {
            validator: (value: number | null) => value === null || Number.isInteger(value * 2),
            message: "Rating must be in half-star steps",
        },
    },
    review: {
        type: String,
        default: "",
        trim: true,
        maxLength: [2000, "Review must be 2000 characters or fewer"],
    },
    notes: { type: String, default: "", trim: true },
    hoursPlayed: {
        type: Number,
        default: 0,
        min: [0, "Hours played can't be negative"],
    },
    startedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

savedGameSchema.index({ user: 1, rawgId: 1 }, { unique: true });
savedGameSchema.index({ user: 1, status: 1 });

export type SavedGameData = InferSchemaType<typeof savedGameSchema>;

const savedGame = 
  (mongoose.models.SavedGame as Model<SavedGameData>) ||
  mongoose.model<SavedGameData>("SavedGame", savedGameSchema);

export default savedGame;