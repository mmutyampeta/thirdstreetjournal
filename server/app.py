from flask import Flask, jsonify, request
import json
from flask_cors import CORS
from chat_test import setup, query

app = Flask(__name__)
CORS(app)
bot = None

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

    try:
        bot = setup(keys["pinecone"], keys["openai"])
        response = app.response_class(
            response=json.dumps({'status': 'success'}),
            status=200,
            mimetype='application/json'
        )
        print("SETUP SUCCESS")
    except Exception as e:
        print(e)

        response = app.response_class(
            response=json.dumps({'status': 'failure'}),
            status=500,
            mimetype='application/json'
        )
    
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route("/message", methods = ["GET"])
def message():
    print(request)
    print(request.args.get("query"))

    if bot == None:
        bot = setup(keys["pinecone"], keys["openai"])
    
    testedresponse = query(request.args.get("query"))
    count = 1
    for message in testedresponse["chat_history"]:
        if count % 2 == 0:
            print(f"Output {1}: " + message)
        count += 1

    response = app.response_class(
        response=json.dumps({'status': 'success'}),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response 