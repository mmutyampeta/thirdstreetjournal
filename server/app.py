from flask import Flask, jsonify
import json

# chat bot requirements imports
from langchain_community.vectorstores.pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
import pinecone

app = Flask(__name__)

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
