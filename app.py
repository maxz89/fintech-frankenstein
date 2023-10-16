import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

openai.api_key = 'pk-XBnmRQphAGlLDDtUQnBsXYEaIyGzrurbaxfyTbIqQWsMirEj'

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    prompt = data.get('prompt')
    model = data.get('model', None) 
    if model == None:
        return jsonify({"error": "Model must be specified"}), 400
    if prompt == None:
        return jsonify({"error": "Prompt must be specified"}), 400
    if model == 'GPT':
        try:
            response = openai.Completion.create(
                model='gpt-4',
                prompt=prompt,
                max_tokens=300
            )
            return jsonify({"response": response.choices[0].text.strip()})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))