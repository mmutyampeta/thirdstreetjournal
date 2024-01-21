import openai
import tiktoken
import datetime
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from uuid import uuid4
from pinecone.grpc import PineconeGRPC

openai.api_key = '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'
pc = PineconeGRPC(api_key='ed95f018-c846-4cd6-b05a-d05b40a36cd8')

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500,
                                               chunk_overlap=20,
                                               length_function=lambda text: len(tokenizer.encode(text, disallowed_special=())),
                                               separators=['\n\n', '\n', ' ', '']
                                               )

embed = OpenAIEmbeddings(model='text-embedding-ada-002',
                         openai_api_key='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'
                         )

index = pc.Index('myindex')
tokenizer = tiktoken.get_encoding('cl100k_base')
batch_limit = 100
current_timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')


texts = []
metadatas = []

def add_text_manually(text: str):
    # text = f'Entry Timestamp: {current_timestamp}\n----------------\n{text}'
    record_texts = text_splitter.split_text(text)
    
    metadata = {
        'timestamp': current_timestamp
    }
   
    record_metadatas = [{
        'chunk': i, 
        'text': text,
        **metadata
    } for i, text in enumerate(record_texts)]
    
    texts.extend(record_texts)
    metadatas.extend(record_metadatas)
    
    if len(texts) >= batch_limit:
        ids = [str(uuid4()) for _ in range(len(texts))]
        embeds = embed.embed_documents(texts)
        index.upsert(vectors=zip(ids, embeds, metadatas))
        texts.clear()
        metadatas.clear()

r = input('Input: ')
inputlist = [r]
while True:
    try:
       line = input()
    except:
        break
    inputlist.append(line)
while True: 
    add_text_manually('\n'.join(inputlist))
    print('Cached successfully (but you need to input "q" or "exit" to save)')
    r = input('Input: ')
    if r.lower() in ['q', 'exit']: break
    if r.lower() == 'e': exit(0)
    inputlist = [r]
    while True:
        try:
            line = input()
        except:
            break
        inputlist.append(line)
print('Thank you!')

if len(texts) > 0:
    ids = [str(uuid4()) for _ in range(len(texts))]
    embeds = embed.embed_documents(texts)
    index.upsert(vectors=zip(ids, embeds, metadatas)) #save to pinecone
print('successfully saved to pinecone.')