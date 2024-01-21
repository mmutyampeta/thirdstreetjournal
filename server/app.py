from flask import Flask, jsonify, request
import json
from flask_cors import CORS
# from chat_test import setup, query -> chat_test was the initial script.  After updating our database heavily, we came to agent_test
from agent_test import setup, query, newsPull

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
    global bot
    # Perform setup actions here
    # You can add your logic for chat setup
    # For now, just returning a success response
    file = open('keys.json')
    keys = json.load(file)
    file.close()

    try:
        # bot = setup(keys["pinecone"], keys["openai"])
        bot = setup()
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
    global bot

    file = open('keys.json')
    keys = json.load(file)
    file.close()

    if bot == None:
        bot = setup(keys["pinecone"], keys["openai"])
    
    chatResponse = query(request.args.get("query"), bot)
    count = 1
    """
    for message in testedresponse["chat_history"]:
        if count % 2 == 0:
            print(f"Message {1}: " + message.content)
            # print(f"Output {1}: " + str(message))
        count += 1
    """

    print("Output Message: " + chatResponse['chat_history'][-1].content)

    chatMessage = chatResponse['chat_history'][-1].content

    response = app.response_class(
        response=json.dumps({
            'status': 'success',
            'text': chatMessage
        }),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response 

@app.route("/news", methods = ['GET'])
def getNews():
    file = open('keys.json')
    keys = json.load(file)
    file.close()

    try:
        newsArticles = newsPull(10, keys["pinecone"], keys["openai"])
        print(newsArticles)
        print(type(newsArticles))

        # jsonNews = json.dumps(newsArticles) # won't work since newArticles is a list

        print("HELLO")
        count = 1
        newsDict = []
        for i in newsArticles:
            temp = {}
            temp['title'] = i.metadata['title']
            temp['description'] = i.metadata['description']
            temp['url'] = i.metadata['url']
            newsDict.append(temp)
 
        print("TEST")
        jsonNews = json.dumps(newsDict)

        print(type(jsonNews))
        response = app.response_class(
            response=json.dumps({
                'status': 'success',
                'text': jsonNews}),
            status=200,
            mimetype='application/json'
        )
        print("News Retrieval SUCCESS")
    except Exception as e:
        print(e)

        response = app.response_class(
            response=json.dumps({'status': 'failure'}),
            status=500,
            mimetype='application/json'
        )
    
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response 