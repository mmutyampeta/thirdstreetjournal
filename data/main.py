import openai
import requests
import random
import tiktoken
from pinecone.grpc import PineconeGRPC
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from bs4 import BeautifulSoup
from uuid import uuid4
from urllib import parse
from newsapi import NewsApiClient

openai.api_key = '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'
pc = PineconeGRPC(api_key='ed95f018-c846-4cd6-b05a-d05b40a36cd8')
index = pc.Index('thirdstreetjournal2')
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

def cache_article(source_name: str, author: str, title: str, description: str,
                  url: str, urlToImage: str, publishedAt: str):
    global texts, metadatas
    try:
        site_text = get_site_text(url)
    except Exception as e:
        print(e)
        try:
            site_text = get_site_text_scraperapi(url)
        except:
            return
    
    # site_text = site_text.encode('ascii', 'ignore')
    # site_text = ''.join([i if ord(i) < 128 else ' ' for i in site_text])
    
    # if len(site_text) < 1200:
    #     try:
    #         site_text = get_site_text_scraperapi(url)  
    #     except:
    #         return
        
    #     if len(site_text) < 1200:
    #         print(url)
    #         return              #failed twice, so cut loss
    prompt = 'Summarize this text dump from a website but don\'t mention in your response that you are summarizing a text dump. Be sure to include specific dates/times in your response. If the website is jargon, reply with "the website is jargon":\n""""{}"""'.format(site_text)
    if len(tokenizer.encode(prompt)) > 16370:
        prompt = prompt[:65540]
        while len(tokenizer.encode(prompt)) > 16370:
            prompt = prompt[:-200]
            
    
    summary_res = openai.chat.completions.create(model='gpt-3.5-turbo-16k-0613',
                                            seed=2005,
                                            temperature=0,
                                            messages=[{
                                                    'role': 'user',
                                                    'content': prompt 
                                                }]
                                            )

    summary_text = summary_res.choices[0].message.content
    print(summary_text)
    if 'website is jargon' in summary_text.lower():
        try:  
            print('trying this')
            site_text = get_site_text_scraperapi(url)
            print(site_text)
            prompt = 'Summarize this text dump from a website but don\'t mention in your response that you are summarizing a text dump. Be sure to include specific dates/times in your response. If the website is jargon, reply with "the website is jargon":\n""""{}"""'.format(site_text)
            if len(tokenizer.encode(prompt)) > 16370:
                prompt = prompt[:65540]
                while len(tokenizer.encode(prompt)) > 16370:
                    prompt = prompt[:-200]
            summary_res = openai.chat.completions.create(model='gpt-3.5-turbo-16k-0613',
                                            seed=2005,
                                            temperature=0,
                                            messages=[{
                                                    'role': 'user',
                                                    'content': prompt 
                                                }]
                                            )
            summary_text = summary_res.choices[0].message.content
            if 'website is jargon' in summary_text.lower():
                print(url)
                return                                 #failed twice, so cut loss
        except Exception as e:
            print(e)
            return 
        
        # if len(site_text) < 1200:
        #     print(url)
        #     return              #failed twice, so cut loss
    
    print(url, summary_text)
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
   
    record_metadatas = [{
        'chunk': i, 
        'text': text, 
        **metadata
    } for i, text in enumerate(record_texts)]
    
    texts.extend(record_texts)
    metadatas.extend(record_metadatas)
    
    if len(texts) > 0:
        ids = [str(uuid4()) for _ in range(len(texts))]
        embeds = embed.embed_documents(texts)
        index.upsert(vectors=zip(ids, embeds, metadatas))
        texts.clear()
        metadatas.clear()
    
    # if len(texts) >= batch_limit:
    #     ids = [str(uuid4()) for _ in range(len(texts))]
    #     embeds = embed.embed_documents(texts)
    #     index.upsert(vectors=zip(ids, embeds, metadatas))
    #     texts.clear()
    #     metadatas.clear()

def get_site_text(url: str):
    site_html = requests.get(url, headers={'User-Agent': random.choice(useragents),
                                           'Connection': 'keep-alive',
                                           'Accept': 'text/plain,text/html,*/*',
                                           'Accept-Encoding': 'gzip,deflate,br'
                                           }, timeout=12).text
    soup = BeautifulSoup(site_html, 'html.parser')
    text_elems = soup.get_text(strip=True)
    return text_elems

def get_site_text_scraperapi(url: str):
    enc = parse.urlencode({'api_key': 'f361c234135c8e312632beaac210187f', 'url': url})
    site_html = requests.get(f'http://api.scraperapi.com/?{enc}', timeout=24).text
    soup = BeautifulSoup(site_html, 'html.parser')
    text_elems = soup.get_text(strip=True)
    return text_elems

    
newsapi = NewsApiClient(api_key='09cab20c6a4c42778ab9ced50a0a65e1')
query_topics = ['(finance OR investment OR banking OR fiscal)',
                '(economy OR inflation OR deflation OR trade)',
                '(technology OR software OR hardware OR tech)',
                '(AI OR robotics OR machinelearning OR neuralnetworks)',
                '(politics OR government OR elections OR legislation)',
                '(business OR entrepreneurship OR corporate OR markets)']


for t in query_topics:
    res = newsapi.get_everything(q='finance', to='2024-01-01', sort_by='popularity', domains='cnbc.com,forbes.com,reuters.com,bbc.co.uk,nytimes.com,businessinsider.com,cnn.com,nbcnews.com,npr.org,washingtonpost.com,theguardian.com,vox.com,apnews.com,time.com')
    entries = res['articles'][:200]
    for i, entry in enumerate(entries):
        cache_article(entry['source']['name'] or 'Unknown', entry['author'] or 'Unknown', entry['title'] or 'Unknown', 
                    entry['description'] or 'Unknown', entry['url'] or 'Unknown', entry['urlToImage'] or 'Unknown', entry['publishedAt'] or 'Unknown'
                    )
        print(i+1)
        
if len(texts) > 0:
    ids = [str(uuid4()) for _ in range(len(texts))]
    embeds = embed.embed_documents(texts)
    index.upsert(vectors=zip(ids, embeds, metadatas))