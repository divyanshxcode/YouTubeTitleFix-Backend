import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  youtubeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  AI_Title: {
    type: String,
    required: true,
    trim: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
