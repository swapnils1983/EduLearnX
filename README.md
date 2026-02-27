# EduLearnX

EduLearnX is a full-stack e-learning platform with:

- **Frontend**: React + Vite student/instructor UI
- **Backend**: Node.js + Express API with MongoDB
- **Recommender**: Python Flask microservice for course recommendations

---

## Project Structure

```text
EduLearnX/
├── frontend/      # React app (Vite)
├── backend/       # Express API
└── recommender/   # Flask ML recommendation service
```

---

## Tech Stack

- **Frontend**: React, Vite, React Router, Axios, Tailwind
- **Backend**: Node.js, Express, Mongoose, JWT, Cloudinary, PayPal SDK
- **Recommender**: Flask, Pandas, scikit-learn, PyMongo
- **Database**: MongoDB

---

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.9+
- MongoDB (local or Atlas)

---

## Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET_ID=your_paypal_secret
```

### Recommender Mongo URI

Set Mongo URI in `recommender/model.py`:

```python
MONGO_URI = "your_mongodb_connection_string"
```

> The recommender reads from database `test`, collection `courses`, and filters `isPublised: true`.

---

## Installation

From the project root, install each service dependencies.

### 1) Backend

```bash
cd backend
npm install
```

### 2) Frontend

```bash
cd ../frontend
npm install
```

### 3) Recommender

```bash
cd ../recommender
python -m venv .venv
```

Windows (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install Python packages:

```bash
pip install -r requirements.txt
```

---

## Run the Project (3 Terminals)

### Terminal 1: Recommender

```bash
cd recommender
python app.py
```

Runs on: `http://localhost:5001`

### Terminal 2: Backend

```bash
cd backend
npm run dev
```

Runs on: `http://localhost:5000`

### Terminal 3: Frontend

```bash
cd frontend
npm run dev
```

Runs on: `http://localhost:5173`

---

## Service Flow

1. User interacts with frontend (`frontend`)
2. Frontend calls Express backend (`backend`)
3. Backend handles auth, courses, media, payment, progress
4. Backend forwards recommendation requests to Flask (`recommender`)
5. Recommender returns similar courses by description similarity

---

## Key API Base Paths (Backend)

- `/auth`
- `/media`
- `/instructor/course`
- `/student/course`
- `/student/order`
- `/progress`
- `/recomendation` (spelling in current code)

Recommender direct endpoint:

- `POST http://localhost:5001/recommend`

---

## Frontend Main Routes

- `/` or `/home`
- `/login`
- `/signup`
- `/courses`
- `/courses/details/:id`
- `/courses/watch/:id`
- `/my-learning`
- `/instructor`
- `/instructor/add-course`
- `/payment-return`

---

## Notes

- Start recommender before using recommendations.
- Recommendation model is built on service startup; restart recommender after course data changes.

---
