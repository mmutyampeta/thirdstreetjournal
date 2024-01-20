import openai
import requests
import random
import tiktoken
from pinecone.grpc import PineconeGRPC
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from bs4 import BeautifulSoup
from uuid import uuid4
from newsapi import NewsApiClient

pc = PineconeGRPC(api_key='ed95f018-c846-4cd6-b05a-d05b40a36cd8')
index = pc.Index('myindex')
tokenizer = tiktoken.get_encoding('cl100k_base')
batch_limit = 100

useragents = ['Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
              'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/41.0.2272.96 Safari/537.36',
              'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
              'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
              'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) 80.0.345.0 Safari/537.36',
              'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.345.0Mobile Safari/537.36  (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)']

#https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers#user_agent_version
#https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0

text_splitter = RecursiveCharacterTextSplitter(chunk_size=400,
                                               chunk_overlap=20,
                                               length_function=lambda text: len(tokenizer.encode(text, disallowed_special=())),
                                               separators=['\n\n', '\n', ' ', '']
                                               )

embed = OpenAIEmbeddings(model='text-embedding-ada-002', 
                         openai_api_key='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'
                         )

texts = []
metadatas = []

def cache_article(source_name, author, title, description, url, urlToImage, publishedAt):
    global texts, metadatas
    site_text = get_site_text(url)
    summary_res = openai.chat.completions.create(model='gpt-3.5-turbo-16k-0613',
                                            seed=2005,
                                            messages=[{
                                                    'role': 'user',
                                                    'content': 'summarize this text dump from a website don\'t mention what you\'re doing in your response. Be sure to include specific dates/times.\n""""{}"""'.format(site_text)
                                                }]
                                            )  
    summary_text = summary_res.choices[0].message.content
    record_texts = text_splitter.split_text(summary_text)
    
    metadata = {
        'source_name': source_name,
        'author': author,
        'title': title,
        'description': description,
        'url': url,
        'urlToImage': urlToImage,
        'publishedAt': publishedAt
    }
    
    safe_metadata = {
        'source_name': metadata['source_name'] or 'Unknown',
        'author': metadata['author'] or 'Unknown',
        'title': metadata['title'] or 'Unknown',
        'description': metadata['description'] or 'Unknown',
        'url': metadata['url'] or 'Unknown',
        'urlToImage': metadata['urlToImage'] or 'Unknown',
        'publishedAt': metadata['publishedAt'] or 'Unknown'
    }
    
    print(safe_metadata)

    record_metadatas = [{
        'chunk': i, 
        'text': text, 
        **safe_metadata
    } for i, text in enumerate(record_texts)]
    
    texts.extend(record_texts)
    metadatas.extend(record_metadatas)
    
    if len(texts) >= batch_limit:
        ids = [str(uuid4()) for _ in range(len(texts))]
        embeds = embed.embed_documents(texts)
        index.upsert(vectors=zip(ids, embeds, metadatas))
        texts = []
        metadatas = []

def get_site_text(url: str):
    site_html = requests.get(url, headers={
        'User-Agent': random.choice(useragents),
        'Connection': 'keep-alive',
        'Accept': 'text/plain,text/html,*/*',
        'Accept-Encoding': 'gzip,deflate,br'
    }).text
    soup = BeautifulSoup(site_html, 'html.parser')
    text_elems = soup.get_text()
    return text_elems
    
newsapi = NewsApiClient(api_key='09cab20c6a4c42778ab9ced50a0a65e1')
business = newsapi.get_everything(q='business')
for entry in business['articles'][:50]:
    cache_article(entry['source']['name'], entry['author'], entry['title'], entry['description'], entry['url'],
                  entry['urlToImage'], entry['publishedAt']
                  )
    
if len(texts) > 0:
    ids = [str(uuid4()) for _ in range(len(texts))]
    embeds = embed.embed_documents(texts)
    index.upsert(vectors=zip(ids, embeds, metadatas))