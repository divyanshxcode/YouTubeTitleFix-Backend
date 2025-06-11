import Express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./db.js";
import Video from "./models/video.js";
import { getTranscript } from "./services/youtubeTranscriptService.js";
import { generateTitleFromPrompt } from "./services/gemini.js";
import cors from "cors";

// Load environment variables
configDotenv();

// Initialize app
const app = Express();
const port = process.env.port || 3000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(Express.json());

// Helper function to extract YouTube video ID
const getYouTubeId = (url) => {
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname.includes("youtu.be")
    ) {
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      }
      return parsedUrl.searchParams.get("v");
    }
    return null;
  } catch (error) {
    console.error("Error parsing URL:", error.message);
    return null;
  }
};

// API route to handle video link and generate AI title
app.post("/api/video", async (req, res) => {
  const { videoLink } = req.body;

  if (!videoLink) {
    return res.status(400).json({ error: "Please provide the video link" });
  }

  const youtubeId = getYouTubeId(videoLink);

  if (!youtubeId) {
    return res.status(400).json({ error: "Invalid YouTube link" });
  }

  try {
    // Check if already exists in DB
    const videoFind = await Video.findOne({ youtubeId });

    if (videoFind) {
      return res.status(200).json({
        message: "AI Title already generated",
        data: videoFind.AI_Title,
      });
    }

    // Get transcript
    const transcript = await getTranscript(youtubeId);

    if (!transcript) {
      return res.status(404).json({
        error: "Transcript not available for this video.",
      });
    }

    // Generate title from transcript
    const aiTitle = await generateTitleFromPrompt(transcript);

    // Save to DB
    const newVideo = new Video({
      youtubeId,
      AI_Title: aiTitle,
    });

    await newVideo.save();

    return res.status(201).json({
      message: "AI Title generated and saved successfully",
      data: aiTitle,
    });
  } catch (error) {
    console.error("Error generating title:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log("🚀 Server is running on port", port);
});