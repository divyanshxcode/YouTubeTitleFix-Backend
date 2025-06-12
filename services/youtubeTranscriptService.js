import TranscriptAPI from "youtube-transcript-api";

export const getTranscript = async (videoId) => {
  try {
    const transcriptData = await TranscriptAPI.getTranscript(videoId);
    const transcriptText = transcriptData.map((item) => item.text).join(" ");
    console.log("✅ Transcript sample:", transcriptText.slice(0, 500));
    return transcriptText;
  } catch (error) {
    console.warn("Transcript not available or fetch failed:", error.message);
    return null;
  }
};

// Transcript Testing Code...

// TranscriptAPI.getTranscript("vHua-t_8hrA").then(console.log);
