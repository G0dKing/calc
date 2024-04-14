from flask import Flask, request, jsonify
from flask_cors import CORS
import numexpr as ne
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/app', methods=['POST'])
def calculate():
    data = request.json
    try:
        result = ne.evaluate(data['expression']).item()
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
