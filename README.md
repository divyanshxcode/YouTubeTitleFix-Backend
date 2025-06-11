# YouTubeTitleFix (Backend)

A Node.js backend for our extension: [YouTubeTitleFix](https://github.com/divyanshxcode/YouTubeTitleFix)
Generates accurate, non-clickbait video titles using AI transcript analysis

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **AI:** Google Gemini
- **Transcripts:** youtube-transcript-api

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/youtube-ai-title-backend.git
cd youtube-ai-title-backend
npm install

# Setup environment
cp .env.example .env
# Add your GEMINI_API_KEY and DB_KEY

# Run
npm start
```

## 📁 Structure

```
├── models/video.js           # MongoDB schema
├── services/
│   ├── gemini.js            # AI integration
│   └── youtubeTranscriptService.js  # Transcript extraction
├── index.js                 # Main server
└── db.js                    # Database connection
```

## 🔌 API

**POST** `/api/video`

```json
{
  "videoLink": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**

```json
{
  "message": "AI Title generated successfully",
  "data": "Clear and Descriptive Video Title"
}
```
--- 

**Part of the '[YouTubeTitleFix](https://github.com/divyanshxcode/YouTubeTitleFix)'  Chrome extension**
