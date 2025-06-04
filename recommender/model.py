import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from pymongo import MongoClient
from bson import ObjectId

# MongoDB connection
MONGO_URI = "mongodb+srv://swapnilsonawane86547:WG6n5Opy9shMWyzl@cluster0.9u2ma.mongodb.net/?retryWrites=false&connectTimeoutMS=30000"
client = MongoClient(MONGO_URI)
db = client["test"]
collection = db["courses"]

# Utility to convert ObjectId to string recursively
def convert_objectids(obj):
    if isinstance(obj, list):
        return [convert_objectids(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: convert_objectids(v) for k, v in obj.items()}
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj

# Load data
def get_data():
    data = pd.DataFrame(list(collection.find({"isPublised": True})))
    data['description'] = data['description'].fillna('')
    return data

# Build the TF-IDF model and cosine similarity matrix
def build_model(data):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(data['description'])
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices = pd.Series(data.index, index=data['title']).drop_duplicates()
    return tfidf_matrix, cosine_sim, indices

# Get recommendations based on course title
def get_recommendations(title, data, cosine_sim, indices):
    title_lower = title.lower()
    matches = [t for t in indices.index if t.lower() == title_lower]

    if not matches:
        close_matches = [t for t in indices.index if title_lower in t.lower()]
        return {
            "error": f"Course titled '{title}' not found.",
            "suggestions": close_matches[:5]
        }

    idx = indices[matches[0]]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:5]
    course_indices = [i[0] for i in sim_scores]

    recommended_courses = data.iloc[course_indices].copy()
    result = recommended_courses.to_dict(orient='records')

    return convert_objectids(result)
