import mongoose, { Schema } from "mongoose";
const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
    },
    title: {
        type: String,
        default: "Untitled",
    },
    detectedSubject: {
        type: String,
        default: "",
    },
    imageUrl: {
        type: String,
        required: true,
    },
    aiContent: {
        type: String,
        default: "",
    },
    editedContent: {
        type: String,
        default: "",
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["queued", "processing", "completed", "failed"],
        default: "queued",
    },
    mimeType: {
        type: String,
        required: true,
    },
    errorMessage: {
        type: String,
    },
    processingStartedAt: {
        type: Date,
    },
    processingCompletedAt: {
        type: Date
    }
}, { timestamps: true });
noteSchema.index({
    userId: 1,
    subjectId: 1
});
noteSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
    }
});
const Note = mongoose.model("Note", noteSchema);
export default Note;
