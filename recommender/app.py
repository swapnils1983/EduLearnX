from flask import Flask, request, jsonify
from flask_cors import CORS
from model import get_data, build_model, get_recommendations

app = Flask(__name__)
CORS(app)

data = get_data()
_, cosine_sim, indices = build_model(data)

@app.route('/')
def home():
    return jsonify({"message": "ML API is running"})

@app.route('/recommend', methods=['POST'])
def recommend():
    req = request.get_json()
    title = req.get("title")

    if not title:
        return jsonify({"error": "Title is required"}), 400

    result = get_recommendations(title, data, cosine_sim, indices)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001)
