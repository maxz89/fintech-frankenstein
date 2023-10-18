import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

openai.api_key = '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'

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
            response = openai.ChatCompletion.create(
                model='gpt-4',
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=300
            )
            
            print(response['choices'][0]['message']['content'])
            return jsonify({"response": str(response['choices'][0]['message']['content'])})
            # return response['choices'][0]['message']['content']
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
    
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))