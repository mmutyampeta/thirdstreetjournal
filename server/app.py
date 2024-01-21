from flask import Flask, jsonify
import json
from flask_cors import CORS
from chat_test import setup

app = Flask(__name__)
CORS(app)

@app.route("/", methods = ["GET"])
def base():
    return "<p>Hello, World!</p>"

@app.route("/testroute", methods = ["GET"])
def hello_world():
    file_path = 'test.json'

    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return jsonify(data)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route("/setupchat", methods=["POST"])
def setup_chat():
    # Perform setup actions here
    # You can add your logic for chat setup
    # For now, just returning a success response
    file = open('keys.json')
    keys = json.load(file)
    file.close()

    setup(keys["pinecone"], keys["openai"])

    response = app.response_class(
        response=json.dumps({'status': 'success'}),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route("/chatresponse", methods = ["GET"])
def message():
    print("hello2")